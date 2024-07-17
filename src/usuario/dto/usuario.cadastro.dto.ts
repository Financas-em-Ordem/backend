import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class UsuarioCadsatroDto {
    @ApiProperty({example: "teste@gmail.com"})
    @IsNotEmpty({message: 'Email não pode estar vazio'})
    @IsEmail()
    email: string


    @ApiProperty({example: "Maria Silva"})
    @IsNotEmpty({message: 'O nome completo não pode estar vazio'})
    @IsString()
    nome_completo: string;


    @ApiProperty({example: "111.111.111-11"})
    @IsNotEmpty({message: 'o CPF não pode estar vazio'})
    @IsString()
    cpf: string

    @ApiProperty({example: "3000"})
    @IsNotEmpty({message: "O salario não pode estar vazio"})
    salario: number

    @ApiProperty({example: "Aa@123456"})
    @IsNotEmpty({message: 'A senha não pode estar vazia'})
    @IsString()
    senha: string
}