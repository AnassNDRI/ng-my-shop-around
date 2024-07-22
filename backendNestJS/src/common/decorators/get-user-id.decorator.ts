// get-user-id.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): number => {
    const request = ctx.switchToHttp().getRequest();
    console.log('User in request:', request.user); // Pour le debug
    if (!request.user) {
      return null;
    }
    return request.user.utilisateur_id;
  },
);
