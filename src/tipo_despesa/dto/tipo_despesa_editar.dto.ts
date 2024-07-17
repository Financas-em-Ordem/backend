import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString} from 'class-validator';
export class TipoDespesaEdicaoDto {
    @ApiProperty({example: 1})
    @IsNumber()
    id:number

    @ApiProperty({example: "Viver Edit"})
    @IsNotEmpty({message: "O nome nao pode estar vazio"})
    @IsString()
    nome: string;

    @ApiProperty({example: 55})
    @IsNotEmpty({message: "O percentual nao pode estar vazio"})
    percentual_salario: number
}