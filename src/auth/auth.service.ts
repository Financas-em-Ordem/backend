import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService
  ) { }

  async validateUser(email: string, senha: string): Promise<any> {
    const user = await this.usuarioService.encontrarUsuario(email);

    if (user && await bcrypt.compare(senha, user.senha)) return {access_token: this.jwtService.sign({...user})}

    throw new Error("erro ao logar, senha ou email estão incorretos")
  }
}
