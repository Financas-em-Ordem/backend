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

    async login(email: string, senha: string) {
        const usuario = await this.usuarioService.encontrarUsuario(email);
        console.log(email)

        if (usuario) {
            const validaSenha = await bcrypt.compare(senha, usuario.senha);

            if(validaSenha){


                return {
                    access_token: this.jwtService.sign({email: usuario.email, nome_completo: usuario.nome_completo}),
                    message: "usuário logado com sucesso"
                }

            }
        }

        throw new Error("Email ou senha nao conferem")
    }
}
