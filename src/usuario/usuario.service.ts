import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { UsuarioCadsatroDto } from './dto/usuario.cadastro.dto';
import * as bcript from 'bcrypt'

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,


    ) { }

    async listar() {
        return this.usuarioRepository.find();
    }

    async cadastrar(usuario: UsuarioCadsatroDto): Promise<Usuario> {
        const usuarioExiste = await this.encontrarUsuarioEmailCPF(usuario.email, usuario.cpf)

        if (!usuarioExiste.length) {
            let novoUsuario = new Usuario();
            novoUsuario.email = usuario.email
            novoUsuario.nome_completo = usuario.nome_completo
            novoUsuario.data_nascimento = usuario.data_nascimento
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

        throw new BadRequestException('Erro ao cadastrar', { cause: new Error(), description: 'Usuário já existe. Tente um email ou cpf diferentes' })

    }

    cadastrarVariosUsers(usuarios: UsuarioCadsatroDto[]) {
        usuarios.forEach(async (usuario) => {
            const usuarioExiste = await this.encontrarUsuarioEmailCPF(usuario.email, usuario.cpf)

            if (!usuarioExiste.length) {
                let novoUsuario = new Usuario();
                novoUsuario.email = usuario.email
                novoUsuario.nome_completo = usuario.nome_completo
                novoUsuario.data_nascimento = usuario.data_nascimento
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
        return this.usuarioRepository.findOne({
            where: {
                email: email
            }
        })
    }

    async encontrarUsuarioEmailCPF(email: string, cpf: string): Promise<Usuario[]> {
        return this.usuarioRepository.find({
            where: [
                { email: email },
                { cpf: cpf }
            ]
        })
    }

    async encontrarPorId(id: number) {
        const usuario = await this.usuarioRepository.findOne({
            where: {
                id: id
            }
        })

        if (usuario) {
            return {
                id: usuario.id,
                nome: usuario.nome_completo,
                email: usuario.email,
                salario: usuario.salario
            }
        }

        throw new BadRequestException('Erro ao encontrar usuario', { cause: new Error(), description: 'Usuário nao encontrado' })

    }

}