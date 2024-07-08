
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

import { UsuarioModule } from 'src/usuario/usuario.module';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategies';


@Module({
  imports: [
    UsuarioModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers:[AuthController],
  exports:[AuthService]
})
export class AuthModule { }

