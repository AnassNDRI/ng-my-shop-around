// jwt.strategy.ts
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from '@nestjs/config';
import { PrismaService } from "../prisma/prisma.service";

type Payload = {
  sub: number;
  utilisateur_email: string;
  role_id?: number;
  utilisateur_id?: number;
  tokenVersion: number;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService, private readonly prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get("SECRET_KEY"),
      ignoreExpiration: false
    });
  }

  async validate(payload: Payload) {
    const user = await this.prismaService.utilisateurs.findUnique({
      where: { utilisateur_email: payload.utilisateur_email },
      include: { roles: true }
    });

    if (!user) {
      throw new UnauthorizedException("Non autorisé - Utilisateur non trouvé");
    }

    if (payload.tokenVersion !== user.tokenVersion) {
      throw new UnauthorizedException("Non autorisé - Version du jeton incompatible. Le jeton n'est plus valide.");
    }

    Reflect.deleteProperty(user, 'utilisateur_mdp');

    return { ...user, role_id: user.utilisateur_role_id };
  }
}
