import { BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { RegisterCustomerAddressDto } from '../users/dto/RegisterCustomerAddressDto';

@Injectable()
export class AddressService {

  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UsersService,
  ) {}

    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  Register Customer Address @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    async registerCustomerAddress(
      registerCustomerAddressDto: RegisterCustomerAddressDto, 
      customerId: number,  billingAddressId?: number 
    ) {
      try {
        const {
          utilisateur_id,
          adresse_rue,
          adresse_numero,
          adresse_boite,
          adresse_cp,
          adresse_ville,
          adresse_pays,
        } = registerCustomerAddressDto;
  
        // Vérification des tailles des champs
        if (adresse_rue.length < 1 || adresse_rue.length > 255) {
          throw new BadRequestException('La longueur de la rue doit être comprise entre 1 et 255 caractères.');
        }
        if (adresse_numero.length < 1 || adresse_numero.length > 6) {
          throw new BadRequestException('La longueur du numéro doit être comprise entre 1 et 6 caractères.');
        }
        if (adresse_boite && (adresse_boite.length < 1 || adresse_boite.length > 6)) {
          throw new BadRequestException('La longueur de la boîte doit être comprise entre 1 et 6 caractères.');
        }
        if (adresse_cp.length < 4 || adresse_cp.length > 6) {
          throw new BadRequestException('La longueur du code postal doit être comprise entre 4 et 6 caractères.');
        }
        if (adresse_ville.length < 1 || adresse_ville.length > 100) {
          throw new BadRequestException('La longueur de la ville doit être comprise entre 1 et 100 caractères.');
        }
        if (adresse_pays.length < 1 || adresse_pays.length > 255) {
          throw new BadRequestException('La longueur du pays doit être comprise entre 1 et 255 caractères.');
        }
  
        // On vérifie si l'utilisateur existe
        const user = await this.prismaService.utilisateurs.findUnique({
          where: { utilisateur_id },
        });
        if (!user) {
          throw new NotFoundException('Utilisateur non trouvé');
        }
  
        // On vérifie si le type d'adresse est valide
        const shippingAadresse = await this.prismaService.adresse_type.findFirst({
          where: {
            adresse_type_libelle: 'Livraison',
          },
        });
        if (!shippingAadresse) {
          throw new BadRequestException("Type d'adresse non valide");
        }
        const shippingAadresse_id = shippingAadresse.adresse_type_id;



          if (billingAddressId) {
                // On vérifie si le type d'adresse est valide
            const billingAddress = await this.prismaService.adresse_type.findFirst({
              where: {
                adresse_type_libelle: 'Facturation',
              },
            });
            if (!billingAddress) {
              throw new BadRequestException("Type d'adresse non valide");
            }
            const billingAddressId = billingAddress.adresse_type_id;

            
            // Enregistrement de l'adresse dans la base de données
            await this.prismaService.adresses.create({
              data: {
                utilisateur_id: customerId,
                adresse_rue: adresse_rue,
                adresse_numero: adresse_numero,
                adresse_boite: adresse_boite,
                adresse_cp: adresse_cp,
                adresse_ville: adresse_ville,
                adresse_pays: adresse_pays,
                adresse_type: billingAddressId, 
              },
            });
          } else {
                  // Enregistrement de l'adresse dans la base de données
              await this.prismaService.adresses.create({
                data: {
                  utilisateur_id: customerId,
                  adresse_rue: adresse_rue,
                  adresse_numero: adresse_numero,
                  adresse_boite: adresse_boite,
                  adresse_cp: adresse_cp,
                  adresse_ville: adresse_ville,
                  adresse_pays: adresse_pays,
                  adresse_type: shippingAadresse_id, 
                },
              });
          }
         
      


       
  
        // On retourne une réponse de succès
        return {
          result: true,
          data: {
            result: true,
            data: 'Adresse ajoutée',
            error_code: null,
            error: null,
          },
          error_code: null,
          error: null,
        };
      } catch (error) {
        // Relance l'erreur pour qu'elle soit gérée ailleurs
        throw error;
      }
    }




  
}
