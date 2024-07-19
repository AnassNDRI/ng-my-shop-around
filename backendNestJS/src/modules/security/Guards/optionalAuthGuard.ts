import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class OptionalAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(OptionalAuthGuard.name);

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    this.logger.debug('OptionalAuthGuard canActivate invoked');
    return Promise.resolve(super.canActivate(context))
      .then((result) => {
        this.logger.debug('User authenticated successfully or no authentication provided');
        return true; // Toujours retourner true pour autoriser l'accès
      })
      .catch((err) => {
        this.logger.error('Error during authentication', err);
        return true; // Même en cas d'erreur, autoriser l'accès
      });
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext): any {
    this.logger.debug('OptionalAuthGuard handleRequest invoked');
    if (err) {
      this.logger.error('Error in handleRequest', err);
    }
    return user || null; // Retourne l'utilisateur si présent, sinon null
  }
}
