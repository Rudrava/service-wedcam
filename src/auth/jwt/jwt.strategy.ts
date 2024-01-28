import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EUserType } from 'src/user/entities';
import { AuthService } from '../auth.service';

export interface IJWTPayload {
  id: string;
  audience: EUserType;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private authService: AuthService,
    private readonly reflector: Reflector,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('jwt.secret'),
    });
  }

  async validate(payload: IJWTPayload) {
    const token = await this.authService.getTokenById(payload.id);

    if (!token) {
      throw new UnauthorizedException();
    }

    return token.user;
  }
}
