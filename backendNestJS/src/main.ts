import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './shared/error-management/error-management';

async function bootstrap() {
  dotenv.config(); // Charge les variables d'environnement

  // Vérifie si le dossier existe, sinon créez-le
  const uploadsDir = path.join(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
  }

  const app = await NestFactory.create(AppModule);

  // Activation de CORS pour toutes les origines ou configuration pour des origines spécifiques
  app.enableCors({
       origin: process.env.FRONTEND_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Méthodes HTTP autorisées
    allowedHeaders: 'Content-Type, Accept, Authorization', // En-têtes autorisées
  });

  app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

  // Active la validation définie dans DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Ne garde que les propriétés déclarées dans les DTOs
      forbidNonWhitelisted: true, // Refuse les requêtes contenant des propriétés non déclarées dans les DTOs
      transform: true, // Transforme l'entrée en instance de DTO
      disableErrorMessages: false, // Affiche les messages d'erreur détaillés
    }),
  );

  // Configure un filtre global pour gérer toutes les erreurs HTTP via `AllExceptionsFilter`.
  app.useGlobalFilters(new AllExceptionsFilter());

  // Vérifiez la connexion à la base de données Prisma avec SSL
  const prisma = new PrismaClient();

  try {
    await prisma.$connect();
    console.log('Connected to the database successfully');
  } catch (err) {
    console.error('Failed to connect to the database', err);
  }

  // Utilise le port fourni par Heroku ou le port 3000 par défaut

 //  const port = 3000;
   const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on port ${port}`);
}

bootstrap();
