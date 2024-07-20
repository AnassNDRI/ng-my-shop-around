import { SendGridService } from '@anchan828/nest-sendgrid';

import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailerService {
  constructor(
    private readonly sendGrid: SendGridService,
    private readonly prismaService: PrismaService,
  ) {}

  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //$$$$$$$$$$$$$$$$$$$$$$$$$$$ E-MAILS FOR  MODULE USERS  $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  Send Employee Signup Confirmation @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  async sendDeleteAccountConfirmation(
    email: string,
    name: string,
  ): Promise<void> {
    //|| 'http://localhost:4200'
    const baseUrl = process.env.FRONTEND_URL;

    const emailBody = `
    <!DOCTYPE html>
    <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmation d'Activation de Compte</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            line-height: 1.6;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 5px;
            text-align: center;
          }
          h3 {
            color: #444;
          }
          p {
            margin: 15px 0;
          }
          a {
            display: inline-block;
            background-color: #f4f4f4; 
            color: #007BFF; 
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            border: 2px solid #007BFF;
          } 
          
        </style>
      </head>
      <body>
      <div class="container">
      <h3>Suppression de Votre Compte</h3>
      <p>Bonjour <strong>${name}</strong>,</p>
      <p>Nous vous confirmons la suppression de votre compte ainsi que de toutes les données associées de nos systèmes. Veuillez noter que cette action est <strong>irréversible</strong>.</p>
      <p>Nous tenons à vous exprimer notre gratitude pour le temps passé ensemble et pour la confiance que vous avez placée en nos services. Nous espérons avoir contribué positivement à votre parcours, que ce soit dans la recherche d'opportunités professionnelles ou de talents.</p>
      <p>Si vous avez la moindre question ou si vous nécessitez de l'aide à l'avenir, notre équipe demeure à votre entière disposition. Pour toute assistance ou renseignement supplémentaire, n'hésitez pas à nous contacter en cliquant sur le bouton ci-dessous.</p>
       <a href="${baseUrl}/contact">Nous Contacter</a>
      
      <p>Avec toute notre considération,</p>
      <p><strong>L'équipe de M&M Consulting</strong></p>
    </div>
  </body>

    </html>
  `;
    // On utilisera this.transporter pour envoyer l'email
    await this.sendGrid.send({
      to: email,
      from: process.env.FROM_EMAIL,
      subject: 'Suppression de Votre Compte',
      html: emailBody,
    });
  }
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  Send Mail Awaiting Account Confirmation @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  async sendSignupAwaitingMailConfirmation(
    email: string,
    confirmationMailToken: string,
    name: string,
  ): Promise<void> {
    const baseUrl = process.env.BASE_URL;

    // L'URL de confirmation en utilisant le token
    const confirmationUrl = `${baseUrl}/api/users/confirm-email?token=${confirmationMailToken}`;
    // Corps de l'email en HTML
    const emailBody = `
      <!DOCTYPE html>
      <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirmation de Compte</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              color: #333;
              line-height: 1.6;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background: #fff;
              border: 1px solid #ddd;
              border-radius: 5px;
              text-align: center;
            }
            a {
              display: inline-block;
              background-color: #f4f4f4; 
              color: #007BFF; 
              padding: 10px 20px;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
              border: 2px solid #007BFF;
            } 
          </style>
        </head>
       <body>
        <div class="container" style="font-family: Arial, sans-serif; color: #333;">
          <h3>Confirmez votre adresse e-mail</h3>
          <p>Bonjour ${name},</p>
          <p>Merci de vous être inscrit sur notre plateforme. Pour activer votre compte, veuillez cliquer sur le lien ci-dessous :</p>
          <a href="${confirmationUrl}" style="color: #1a73e8;">Confirmer mon compte</a>
          <p>Si vous n'avez pas demandé à créer un compte, veuillez ignorer cet e-mail.</p>
          <p>Cordialement,</p>
          <p>L'équipe de MyShop Around</p>
        </div>
      </body>
      </html>
    `;
    // Envoi de l'e-mail
    // On utilisera this.transporter pour envoyer l'email
    await this.sendGrid.send({
      to: email,
      from: process.env.FROM_EMAIL,
      subject: 'Confirmation de Compte',
      html: emailBody,
    });
  }
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  Send Signup Awaiting Confirmation @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  async sendSignupAwaitingConfirmation(
    email: string,
    name: string,
  ): Promise<void> {
    const emailBody = `
      <!DOCTYPE html>
      <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Inscription en Attente de Confirmation</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              color: #333;
              line-height: 1.6;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background: #fff;
              border: 1px solid #ddd;
              border-radius: 5px;
              text-align: center;
            }
            h3 {
              color: #444;
            }
            p {
              margin: 15px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h3>Inscription en Attente de Confirmation</h3>
            <p>Bonjour ${name},</p>
            <p>Votre inscription sur la plateforme M&M Consulting est en cours de traitement. Nous sommes en train de vérifier vos informations.</p>
            <p>Une fois votre compte vérifié, vous recevrez un email de confirmation.</p>
            <p>Merci de votre patience et de votre confiance envers M&M Consulting.</p>
            <p>Cordialement,</p>
            <p>L'équipe M&M Consulting</p>
          </div>
        </body>
      </html>
    `;
    // On utilisera this.transporter pour envoyer l'email
    await this.sendGrid.send({
      to: email,
      from: process.env.FROM_EMAIL,
      subject: 'Votre inscription est en attente de confirmation',
      html: emailBody,
    });
  }
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  Send reset password Confirmation @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  async sendResetPassword(
    userEmail: string,
    url: string,
    code: string,
    name: string,
  ): Promise<void> {
    const emailBody = `
            <!DOCTYPE html>
            <html lang="fr">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Réinitialisation de Mot de Passe</title>
                <style>
                  body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    color: #333;
                    line-height: 1.6;
                  }
                  .container {
                    max-width: 600px;
                    margin: 20px auto;
                    padding: 20px;
                    background: #fff;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    text-align: center;
                  }
                  a {
                    display: inline-block;
                    background-color: #f4f4f4; 
                    color: #007BFF; 
                    padding: 10px 20px;
                    text-decoration: none;
                    border-radius: 5px;
                    font-weight: bold;
                    border: 2px solid #007BFF;
                  }
                  a:hover {
                    background-color: #0056b3;
                  }
                  p {
                    color: #444;
                  }
                  .code {
                    font-size: 1.2em;
                    font-weight: bold;
                    color: #d9534f;
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <h3>Réinitialisation de votre mot de passe</h3>
                  <p>Bonjour ${name},</p>
                  <p>Vous avez demandé à réinitialiser votre mot de passe sur le site M&M Consulting.</p>
                  <p>Pour réinitialiser votre mot de passe, veuillez cliquer sur le lien ci-dessous :</p>
                  <a href="${url}">Réinitialiser mon mot de passe</a>
                  <p>Voici votre code de sécurité :</p>
                  <p class="code">${code}</p>
                  <p>Ce code expirera dans 15 minutes.</p>
                  <p>Si vous n'avez pas demandé à réinitialiser votre mot de passe, veuillez ignorer cet email.</p>
                  <p>Cordialement,</p>
                  <p>L'équipe M&M Consulting</p>
                </div>
              </body>
            </html>
          `;
    await this.sendGrid.send({
      to: userEmail,
      from: process.env.FROM_EMAIL,
      subject: 'Réinitialisation de mot de passe',
      html: emailBody,
    });
  }
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  Send reset password change Confirmation @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  async sendPasswordChangeConfirmation(
    userEmail: string,
    name: string,
  ): Promise<void> {
    const emailBody = `
            <!DOCTYPE html>
            <html lang="fr">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Confirmation de Modification de Mot de Passe</title>
                <style>
                  body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    color: #333;
                    line-height: 1.6;
                  }
                  .container {
                    max-width: 600px;
                    margin: 20px auto;
                    padding: 20px;
                    background: #fff;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    text-align: center;
                  }
                  h3 {
                    color: #444;
                  }
                  p {
                    margin: 15px 0;
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <h3>Modification de Votre Mot de Passe</h3>
                  <p>Bonjour ${name},</p>
                  <p>Nous vous confirmons que votre mot de passe a été modifié avec succès.</p>
                  <p>Si vous n'avez pas demandé cette modification, veuillez contacter immédiatement notre support.</p>
                  <p>Cordialement,</p>
                  <p>L'équipe M&M Consulting</p>
                </div>
              </body>
            </html>
          `;
    await this.sendGrid.send({
      to: userEmail,
      from: process.env.FROM_EMAIL,
      subject: 'Confirmation de Modification de Mot de Passe',
      html: emailBody,
    });
  }
 




}
