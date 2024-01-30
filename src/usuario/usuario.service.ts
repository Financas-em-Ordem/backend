import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { UsuarioCadsatroDto } from './dto/usuario.cadastro.dto';
import * as bcript from 'bcrypt' 

@Injectable()
export class UsuarioService{
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>
    ){}

    async listar(){
        return this.usuarioRepository.find();
    }

    async cadastrar (usuario: UsuarioCadsatroDto): Promise<Usuario>{
        let novoUsuario = new Usuario();
        novoUsuario.email = usuario.email
        novoUsuario.nome_completo = usuario.nome_completo
        novoUsuario.data_nascimento = usuario.data_nascimento
        novoUsuario.cpf = usuario.cpf


        /*
        "email": "augustoabreu.202@gmail.com",
        "nome_completo": "Augusto Ferreira de Abreu",
        "data_nascimento": "18//08/2003",
        "cpf": "069.404.051-78",
        "senha": "AUGUSTOf@069"
        */
        this.usuarioRepository.save({
            ...novoUsuario,
            senha: await bcript.hash(usuario.senha, 10)
        })
        return {
            ...novoUsuario,
            senha: undefined
        }
    }

    async encontrarUsuario(email: string): Promise<Usuario>{
        return this.usuarioRepository.findOne({
            where:{
                email: email
            }
        })
    }
}