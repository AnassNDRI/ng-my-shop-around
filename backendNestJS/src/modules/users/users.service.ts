import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { differenceInYears } from 'date-fns';
import * as speakeasy from 'speakeasy';
import { v4 as uuidv4 } from 'uuid';
import { MailerService } from '../mailer/mailer.service';
import { PrismaService } from '../prisma/prisma.service';

import { ResetPasswordConfirmationDto } from './dto/resetPasswordConfirmationDto';
import { ResetPasswordDemandDto } from './dto/resetPasswordDemandDto';
import { SigninDto } from './dto/signinDto';
import { SignupCustomerDto } from './dto/signupCustomerDto';

import { ErrorMessages } from 'src/shared/error-management/errors-message';


@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$   CREATE  $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  Create User Recruiter @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  async signupCustomer(signupCustomerDto: SignupCustomerDto) {
    try {
      const {
        utilisateur_nom,
        utilisateur_prenom,
        utilisateur_date_naissance,
        utilisateur_gsm,
        utilisateur_email,
        utilisateur_mdp,
      } = signupCustomerDto;

      // On verifie si l'utilisateur est déjà inscrit
      await this.ckeckEmailUniquess(utilisateur_email);

      // On verifie si l'email fourni est valide.
      await this.isValidEmail(utilisateur_email);

      // On verifie l'âge de l'utilisateur
      if (!this.isAgeValid(utilisateur_date_naissance)) {
        throw new BadRequestException(`L'utilisateur doit avoir au moins 18 ans`);
      }
      // On verifie si le mot de passe fourni est valide.
      await this.isValidPassword(utilisateur_mdp);

      // On vérifie si le numero est au format valide.
      await this.isValidphoneNumber(utilisateur_gsm);

      const roleCustomer = await this.prismaService.roles.findFirst({
        where: {
          role_libelle: 'Customer',
        },
      });
      const roleID = roleCustomer.role_id;

      // Hasher le mot de passe
      const hash = await bcrypt.hash(utilisateur_mdp, 10);
      // On génère un jeton de confirmation
      const confirmationMailToken = uuidv4();

      // On enregistre l'utilisateur dans la base de données
      const user = await this.prismaService.utilisateurs.create({
        data: {
          utilisateur_nom,
          utilisateur_prenom,
          utilisateur_date_naissance: new Date(utilisateur_date_naissance),
          utilisateur_email,
          utilisateur_mdp: hash,
          utilisateur_gsm,
          utilisateur_role_id: roleID,
          utilisateur_actif: false,
          confirmationMailToken,
          confirmationMailTokenExpires: new Date(
            Date.now() + 24 * 60 * 60 * 1000,
          ), // 24 heures plus tard
          verifiedMail: false, // Initialement non vérifié
        },
      });

      // Envoi de l'e-mail pour verifier le compte de l'utilisateur
      await this.mailerService.sendSignupAwaitingMailConfirmation(
        user.utilisateur_email,
        confirmationMailToken,
        user.utilisateur_nom,
      );
      // On retourne une réponse de succès
      return {
        result: true,
        data: {
          utilisateur_id: user.utilisateur_id,
          utilisateur_nom: user.utilisateur_nom,
          utilisateur_prenom: user.utilisateur_prenom,
          utilisateur_email: user.utilisateur_email,
        },
        error_code: null,
        error: null,
      };
    } catch (error) {
      // Relance l'erreur pour qu'elle soit gérée ailleurs
      throw error;
    }
  }
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  Login @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // Méthode pour connecter un utilisateur à l'application
  async signin(signinDto: SigninDto) {
    try {
      // Récupération de l'email et du mot de passe depuis le DTO (Data Transfer Object)
      const { utilisateur_email, utilisateur_mdp } = signinDto;

      // On vérifie si l'utilisateur existe dans la base de données
      const user = await this.verifyEmailExistence(utilisateur_email);

      // On vérifie si le compte de l'utilisateur est actif
      if (!user.utilisateur_actif)
        throw new ForbiddenException("Votre adresse email n'a pas encore été vérifiée");

      // On compare le mot de passe fourni avec celui enregistré en base de données
      const match = await bcrypt.compare(utilisateur_mdp, user.utilisateur_mdp);
      if (!match) throw new BadRequestException("Mot de passe ou adresse mail ne corresponde pas");

      // On incrémente la version du token pour invalider les anciens tokens
      await this.prismaService.utilisateurs.update({
        where: { utilisateur_id: user.utilisateur_id },
        data: { tokenVersion: { increment: 1 } },
      });

      // Création du payload pour les tokens JWT
      const payload = {
        utilisateur_id: user.utilisateur_id,
        utilisateur_nom: user.utilisateur_nom,
        utilisateur_prenom: user.utilisateur_prenom,
        utilisateur_email: user.utilisateur_email,
        roles: user.roles.role_libelle,
        tokenVersion: user.tokenVersion + 1,
      };

      // Création du token d'accès JWT avec une durée de validité de 2 heures
      const accessToken = this.jwtService.sign(payload, {
        expiresIn: '2h',
        secret: this.configService.get('SECRET_KEY'),
      });

      // Calcul du temps d'expiration pour le token d'accès (en secondes)
      const expireTime = Math.floor(Date.now() / 1000) + 2 * 60 * 60; // 2 heures en secondes

      // Création du refresh token JWT avec une durée de validité de 7 jours
      const refreshToken = this.jwtService.sign(payload, {
        expiresIn: '7d',
        secret: this.configService.get('REFRESH_SECRET_KEY'),
      });

      // Mise à jour de l'utilisateur avec le refresh token dans la base de données
      await this.prismaService.utilisateurs.update({
        where: { utilisateur_id: user.utilisateur_id },
        data: { refreshToken },
      });

      // Retour de la réponse avec les tokens et les informations de l'utilisateur
      return {
        result: true, // Indique que l'opération de connexion a réussi.
        data: {
          token: {
            accessToken, // Le token JWT utilisé pour accéder aux ressources sécurisées.
            refreshToken, // Un token JWT utilisé pour obtenir un nouvel accessToken une fois ce dernier expiré.
            tokenType: 'Bearer', // Le type de token, généralement "Bearer"
            expireTime, // Temps d'expiration du token
          },
          user: {
            utilisateur_nom: user.utilisateur_nom, // Le nom d'utilisateur
            utilisateur_prenom: user.utilisateur_prenom, // Le prenom d'utilisateur
            utilisateur_email: user.utilisateur_email, // L'email de l'utilisateur
            roles: user.roles.role_libelle, // Le titre du rôle de l'utilisateur
          },
        },
        error_code: null, // Aucune erreur n'est survenue,
      };
    } catch (error) {
      // Relance l'erreur pour qu'elle soit gérée ailleurs
      throw error;
    }
  }
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  refreshToken @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  async refreshToken(refreshToken: string) {
    // Validation de base du refreshToken
    if (!refreshToken) {
      // 30 est arbitraire ici

      throw new UnauthorizedException(ErrorMessages.INVALID_REFRESH_TOKEN);
    }

    const user = await this.prismaService.utilisateurs.findFirst({
      where: { refreshToken },
    });

    if (!user)
      throw new UnauthorizedException(ErrorMessages.INVALID_REFRESH_TOKEN);

    const payload = {
      sub: user.utilisateur_id,
      utilisateur_email: user.utilisateur_email,
    };
    const newAccessToken = this.jwtService.sign(payload, {
      expiresIn: '2h',
      secret: this.configService.get('SECRET_KEY'),
    });

    return { accessToken: newAccessToken };
  }
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  logout @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  async logout(utilisateur_id: number) {
    try {
      // On verifie si l'utilisateur (requestingutilisateur_id) existe dans la base de données
      await this.verifyUsersExistence(utilisateur_id);
      // On réinitialise le refreshToken de l'utilisateur à null
      await this.prismaService.utilisateurs.update({
        where: { utilisateur_id },
        data: {
          refreshToken: null,
          tokenVersion: { increment: 1 },
        }, // Réinitialiser le refreshToken à  null
        // garantit que les tokens de rafraîchissement sont invalidés lors de la déconnexion de l'utilisateur,
      });

      // On retourne une réponse indiquant que le token a été réinitialisé
      return { data: 'All tokens have been deactivated' };
    } catch (error) {
      // Gestion de toute autre erreur qui pourrait survenir
      throw new InternalServerErrorException(ErrorMessages.LOGOUT_ERROR);
    }
  }
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  Reset Password @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  async resetPasswordDemand(resetPasswordDemandDto: ResetPasswordDemandDto) {
    try {
      const { email } = resetPasswordDemandDto;

      /////////////////  ** On verifie si l'utilisateur est déjà inscrit
      const user = await this.verifyEmailExistence(email);

      /////////////////  ** Envoyer un mail pour suivre les etapes de l'initialisation de mot de passe
      const code = speakeasy.totp({
        // cette methode crée un code à 5 chiffre qui sera envoyé à utilisateur pour reinitialiser son password
        secret: this.configService.get('OTP_CODE'),
        digits: 5, // code à 5 chiffres
        step: 60 * 15, // Durée 15 minutes
        encoding: 'base32', // encodage
      });
      const name = user.utilisateur_nom;
      // !!!!!!! Techiniquement, ici il faut une url du frontend !!!!!!
      const url = 'http://localhost:4200/reset-pwd';
      await this.mailerService.sendResetPassword(email, url, code, name);

      return {
        result: true,
        data: 'Reset password and mail has been sent',
        error_code: null,
        error: null,
      };
    } catch (error) {
      // Relance l'erreur pour qu'elle soit gérée ailleurs
      throw error;
    }
  }
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  Reset Password Confirmation @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  async resetPasswordConfirmation(
    resetPasswordConfirmationDto: ResetPasswordConfirmationDto,
  ) {
    try {
      const { code, utilisateur_email, utilisateur_mdp } =
        resetPasswordConfirmationDto;

      /////////////////  ** On verifie si l'utilisateur est déjà inscrit
      const user = await this.verifyEmailExistence(utilisateur_mdp);

      /////////////////  ** Verifier si code renvoyé est toujours valide
      const match = speakeasy.totp.verify({
        // cette methode verifie le code à 5 chiffre qui a été envoyé à utilisateur pour reinitialiser son password
        secret: this.configService.get('OTP_CODE'), //
        token: code,
        // Ces 3 lignes sont encore nécessaires pour s'On assurer que la vérification du code TOTP est effectuée
        // avec les mêmes critères que ceux utilisés pour générer le code  (TOTP - Time-Based One-Time Password)
        digits: 5, // code à 5 chiffres
        step: 60 * 15, // Durée 15 minutes
        encoding: 'base32', // encodage
      });
      if (!match)
        throw new UnauthorizedException(ErrorMessages.INVALID_RESET_CODE);
      // ///////////////** Hasher le mot de passe
      const hash = await bcrypt.hash(utilisateur_mdp, 10);
      // ///////////////** On enregistre la modification du password dans la base de données
      await this.prismaService.utilisateurs.update({
        where: { utilisateur_email },
        data: {
          utilisateur_mdp: hash,
          tokenVersion: { increment: 1 }, // On incrémente tokenVersion pour invalider les jetons existants
        },
      });

      const name = user.utilisateur_nom;

      // Ici j'appelle ma méthode logout pour invalider les sessions existantes
      if (user.utilisateur_id) {
        await this.logout(user.utilisateur_id);
      }
      ///////////////// ** Envoyer un mail pour confirmer le changement du mot de passe
      await this.mailerService.sendPasswordChangeConfirmation(
        utilisateur_email,
        name,
      );
      // On retourne un Objet Data de confirmation

      return {
        result: true,
        data: 'password updated',
        error_code: null,
        error: null,
      };
    } catch (error) {
      // Relance l'erreur pour qu'elle soit gérée ailleurs
      throw error;
    }
  }

  
  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$   READ  $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@   Confirmation de l'email de l'utilisateur @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  async confirmUserEmail(token: string) {
    try {
      const user = await this.prismaService.utilisateurs.findFirst({
        where: {
          confirmationMailToken: token,
        },
      });
      if (!user) {
        throw new NotFoundException(ErrorMessages.INVALID_REFRESH_TOKEN);
      }
      // On vérifie si le jeton n'a pas expiré
      if (
        user.confirmationMailTokenExpires &&
        new Date() > user.confirmationMailTokenExpires
      ) {
        throw new BadRequestException(ErrorMessages.EMAIL_CONFIRMATION_EXPIRED);
      }
      const userRoleId = user.utilisateur_role_id;

      await this.verifyRoleExistence(userRoleId);

      // si c'est un candidat ou un recruiter son compte est soumis a verification avant activation
      await this.prismaService.utilisateurs.update({
        where: { utilisateur_id: user.utilisateur_id },
        data: {
          utilisateur_actif: true,
          verifiedMail: true,
          confirmationMailToken: null, // Le jeton est effacé après confirmation
          confirmationMailTokenExpires: null, // La date d'expiration est également  effacée
        },
      });
      // Envoi cette fois-ci d'un e-mail de compte en attente de confirmation par un Consultant

      return {
        result: true,
        data: 'emailConfirmationSucess',
        error_code: null,
        error: null,
      };
    } catch (error) {
      // Relance l'erreur pour qu'elle soit gérée ailleurs
      throw error;
    }
  }

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ User Profil Details @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  async getUserProfile(utilisateur_id: number) {
    try {
      // On vérifie si l'utilisateur existe
      await this.verifyUsersExistence(utilisateur_id);

      // Suppression du mot de passe et autres informations sensibles
      const user = await this.prismaService.utilisateurs.findUnique({
        where: { utilisateur_id: utilisateur_id },
      });
      return {
        result: true,
        data: user,
        error_code: null,
        error: null,
      };
    } catch (error) {
      // Relance l'erreur pour qu'elle soit gérée ailleurs
      throw error;
    }
  }

  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //$$$$$$$$$$$$$$$$$$$$$$$$$$$   Fonctions Privée  $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  /////////////////////////// Fonction pour On verifie si le User existe/////////////////////////////////////////////
  async verifyUsersExistence(utilisateur_id: number) {
    // On verifie si l'utilisateur existe
    const user = await this.prismaService.utilisateurs.findUnique({
      where: { utilisateur_id: utilisateur_id },
      include: {
        roles: true, // Inclure les informations du rôle
      },
    });

    if (!user) throw new NotFoundException(`Aucun utilisateur trouvé`);
    return user;
  }

  ///////////////////////// Fonction pour On verifie l'âge//////////////////////////////////////////////////////////
  isAgeValid(dateBirth: Date): boolean {
    // Obtenir la date actuelle
    const today = new Date();
    // Calculer l'âge
    const age = differenceInYears(today, dateBirth);
    // On verifie si l'âge est d'au moins 18 ans
    return age >= 18 && age < 70;
  }

  /////////////// Fonction pour vérifier le rôle
  async verifyRoleExistence(role_id: number) {
    const role = await this.prismaService.roles.findUnique({
      where: { role_id: role_id },
    });
    if (!role) {
      throw new NotFoundException(`Rôle spécifié introuvable.`);
    }
    return role;
  }
  ///////////////// Fonction pour si l'utilisateur est déjà inscrit
  async ckeckEmailUniquess(utilisateur_email: string) {
    const existingUser = await this.prismaService.utilisateurs.findUnique({
      where: { utilisateur_email: utilisateur_email },
    });
    if (existingUser) {
      throw new ConflictException(`Cet utilisateur existe déjà`);
    }
  }

  ///////////////// Fonction pour si l'utilisateur est déjà inscrit
  async verifyEmailExistence(utilisateur_email: string) {
    const user = await this.prismaService.utilisateurs.findUnique({
      where: { utilisateur_email: utilisateur_email },
      include: {
        roles: true, // Inclure les informations du rôle
      },
    });
    if (!user) throw new NotFoundException(`Utilisateur avec cet email introuvable`);

    return user;
  }

  // Cette méthode vérifie si le numero est au format valide.
  async isValidphoneNumber(phoneNumber: string) {
    // On définit une expression régulière pour un format de numero valide.
    // Numéro de téléphone valide:(+32, +352, +39, +33, +41, +49, +31) suivi d'un espace et de 9 à 11 chiffres
    const phoneNumberRegex = /^\+(32|352|39|33|41|49|31)\s\d{9,11}$/;

    // On teste si le numero correspond au format défini par l'expression régulière.
    if (!phoneNumberRegex.test(phoneNumber)) {
      // Si le numero ne correspond pas, on lance une exception pour indiquer que le numero n'est pas valide.

      throw new BadRequestException(`Format valide : +41 123456789`);
    }
  }

  // Cette méthode vérifie si l'email fourni est valide.
  async isValidEmail(email: string) {
    // On définit une expression régulière pour un format d'email valide.
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // On teste si l'email correspond au format défini par l'expression régulière.
    if (!emailRegex.test(email)) {
      // Si l'email ne correspond pas, on lance une exception pour indiquer que l'email n'est pas valide.
      throw new BadRequestException(`Votre email n'est pas valide`);
    }
    // On vérifie également si la longueur de l'email dépasse 100 caractères.
    if (email.length > 100) {
      // Si oui, on lance une autre exception pour indiquer que l'email est trop long.
      throw new BadRequestException(`Votre email est excessivement long, pas plus de 100 caractères`);
    }
  }

  // Cette méthode vérifie si le mot de passe fourni est valide.
  async isValidPassword(password: string) {
    // On définit une expression régulière pour un format de mot de passe valide.
    // Le mot de passe doit contenir au moins une lettre minuscule, une lettre majuscule, un chiffre et être d'au moins 8 caractères de long.
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;

    // On teste si le mot de passe correspond au format défini par l'expression régulière.
    if (!passwordRegex.test(password)) {
      // Si le mot de passe ne correspond pas, on lance une exception pour indiquer que le mot de passe n'est pas valide.
      // Il doit contenir au moins une lettre majuscule, un caractère spécial, et un chiffre.

      throw new NotFoundException(`Doit contenir au moins : 1 lettre majuscule, 1 caractère spécial, 1 chiffre`);
    }
    // On vérifie également si la longueur du mot de passe dépasse 100 caractères.
    if (password.length > 100) {
      // Si oui, on lance une autre exception pour indiquer que le mot de passe est trop long.
            throw new BadRequestException(`Votre email est excessivement long, pas plus de 100 caractères`);
    }
  }
}
