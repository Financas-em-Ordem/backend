import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UsuarioLoginDTO{
    @ApiProperty({example: "email@gmail.com"})
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty({example: "senha"})
    @IsNotEmpty()
    @IsString()
    password: string
}