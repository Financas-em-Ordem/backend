import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,

    });
  }

  async validate(payload) {
    return {
      id: payload.id,
      email: payload.email,
      nome_completo: payload.nome_completo,
      salario: payload.salario,
      roles: payload.roles
    };
  }
}