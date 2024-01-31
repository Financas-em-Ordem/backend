import { IsEmail, IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class UsuarioCadsatroDto {
    @IsNotEmpty({message: 'Email não pode estar vazio'})
    @IsEmail()
    email: string

    @IsNotEmpty({message: 'O nome completo não pode estar vazio'})
    @IsString()
    nome_completo: string;

    @IsNotEmpty({message: 'A data não pode estar vazia'})
    @IsString()
    data_nascimento: string

    @IsNotEmpty({message: 'o CPF não pode estar vazio'})
    @IsString()
    cpf: string

    @IsNotEmpty({message: 'A senha não pode estar vazia'})
    @IsString()
    senha: string
}