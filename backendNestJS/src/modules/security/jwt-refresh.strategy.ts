// jwt-refresh.strategy.ts
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from '@nestjs/config';
import { PrismaService } from "../prisma/prisma.service";
import { Request } from 'express';

type Payload = {
  sub: number;
  utilisateur_email: string;
  role_id?: number;
  utilisateur_id?: number;
  tokenVersion: number;
};

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private configService: ConfigService, private readonly prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('REFRESH_SECRET_KEY'),
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: Payload) {
    const token = request.headers.authorization?.split(' ')[1];

    const user = await this.prismaService.utilisateurs.findUnique({
      where: { utilisateur_email: payload.utilisateur_email },
      include: { roles: true },
    });

    if (!user) {
      throw new UnauthorizedException("Non autorisé - Vous n'êtes pas connecté");
    }

    if (user.refreshToken !== token) {
      throw new UnauthorizedException("Non autorisé - Le jeton n'est plus valide");
    }

    if (payload.tokenVersion !== user.tokenVersion) {
      throw new UnauthorizedException("Non autorisé - Version du jeton incompatible. Le jeton n'est plus valide");
    }

    Reflect.deleteProperty(user, 'utilisateur_mdp');

    return { ...user, roleId: user.utilisateur_role_id };
  }
}
