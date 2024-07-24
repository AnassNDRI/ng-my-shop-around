import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = {
      result: false,
      data: null,
      error_code: status,
      error: {
        message: '',
        details: exception instanceof HttpException ? exception.getResponse() : 'An unexpected error occurred',
      },
    };

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();
      if (typeof exceptionResponse === 'string') {
        errorResponse.error.message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        errorResponse.error.message = (exceptionResponse as any).message || (exceptionResponse as any).error;
        if (exceptionResponse['message'] instanceof Array) {
          errorResponse.error.message = exceptionResponse['message'].join(', ');
        }
      }
    } else {
      errorResponse.error.message = 'An unexpected error occurred';
    }

    console.error('Exception caught:', {
      statusCode: status,
      message: errorResponse.error.message,
      stack: exception instanceof Error ? exception.stack : null,
    });

    response.status(status).json(errorResponse);
  }
}
