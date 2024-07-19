// Importe les éléments nécessaires depuis NestJS et Express.
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

// Ce décorateur indique que ce filtre d'exception va attraper toutes les exceptions de type HttpException.
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  // La méthode `catch` est appelée chaque fois qu'une exception est levée dans l'application.
  catch(exception: unknown, host: ArgumentsHost) {
    // Obtient le contexte HTTP pour accéder à l'objet de réponse.
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Vérifie si l'exception est une instance de HttpException, sinon utilise le statut 500 (Internal Server Error).
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Prépare l'objet de réponse d'erreur avec une structure standardisée.
    const errorResponse = {
      result: false, // Indique que la requête a échoué.
      data: null, // Aucune donnée à retourner en cas d'erreur.
      error_code: status, // Le code d'erreur HTTP.
      error: { message: '' }, // L'objet pour le message d'erreur.
      message: '', // Un message d'erreur supplémentaire.
    };

    // Vérifie si l'exception est une instance de HttpException pour gérer les différentes réponses.
    if (exception instanceof HttpException) {
      // Obtient la réponse de l'exception, qui peut être une chaîne ou un objet contenant plus de détails.
      const exceptionResponse = exception.getResponse();
      if (typeof exceptionResponse === 'string') {
        // Si c'est une chaîne, utilise cette chaîne pour le message d'erreur.
        errorResponse.error.message = exceptionResponse;
        errorResponse.message = exceptionResponse;
      } else {
        // Si c'est un objet, extrait le message d'erreur de cet objet.
        errorResponse.error.message = exceptionResponse['message'];
        errorResponse.message =
          exceptionResponse['error'] || 'An unexpected error occurred';
      }
    } else {
      // Pour les exceptions non HttpException, utilise un message d'erreur générique.
      errorResponse.error.message = 'An unexpected error occurred';
      errorResponse.message = 'Internal server error';
    }

    // Ajout des logs pour capturer les détails des exceptions.
    console.error('Exception caught:', {
      statusCode: status,
      message: errorResponse.message,
      error: errorResponse.error.message,
      stack: exception instanceof Error ? exception.stack : null,
    });

    // Envoie l'objet de réponse d'erreur au client avec le statut HTTP approprié.
    response.status(status).json(errorResponse);
  }
}
