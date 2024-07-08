import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { UsuarioCadsatroDto } from './dto/usuario.cadastro.dto';
//import { UsarioSessaoDto } from './dto/usuario.sessao.dto';
import * as bcript from 'bcrypt'
import { Role } from 'src/auth/roles.enum';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
    ) { }

    async cadastrar(usuario: UsuarioCadsatroDto): Promise<Usuario> {
        const usuarioExiste = await this.encontrarUsuarioEmailCPF(usuario.email, usuario.cpf)

        if (!usuarioExiste) {
            let novoUsuario = new Usuario();
            novoUsuario.email = usuario.email
            novoUsuario.nome_completo = usuario.nome_completo
            novoUsuario.salario = usuario.salario
            novoUsuario.cpf = usuario.cpf
            novoUsuario.roles = Role.User


            this.usuarioRepository.save({
                ...novoUsuario,
                senha: await bcript.hash(usuario.senha, 10)
            })
            
            return {
                ...novoUsuario,
                senha: undefined
            }
        }

        throw new Error("Usuário já existe. Tente um email ou cpf diferentes")
    }

    cadastrarVariosUsers(usuarios: UsuarioCadsatroDto[]) {
        usuarios.forEach(async (usuario) => {
            const usuarioExiste = await this.encontrarUsuarioEmailCPF(usuario.email, usuario.cpf)

            if (!usuarioExiste) {
                let novoUsuario = new Usuario();
                novoUsuario.email = usuario.email
                novoUsuario.nome_completo = usuario.nome_completo
                novoUsuario.salario = usuario.salario
                novoUsuario.cpf = usuario.cpf

                this.usuarioRepository.save({
                    ...novoUsuario,
                    senha: await bcript.hash(usuario.senha, 10)
                })
                return {
                    ...novoUsuario,
                    senha: undefined
                }
            }
        })
    }

    async encontrarUsuario(email: string): Promise<Usuario> {
        return this.usuarioRepository.findOne({ where: { email: email } })
    }

    async encontrarUsuarioEmailCPF(email: string, cpf: string): Promise<Usuario> {
        return this.usuarioRepository.findOne({
            where: [
                { email: email },
                { cpf: cpf }
            ]
        })
    }
}