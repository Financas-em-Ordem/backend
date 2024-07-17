import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString} from 'class-validator';
export class TipoDespesaDto {
    
    @ApiProperty({example: 'Viver'})
    @IsNotEmpty({message: "O nome nao pode estar vazio"})
    @IsString()
    nome: string;

    @ApiProperty({example: 50})
    @IsNotEmpty({message: "O percentual nao pode estar vazio"})
    percentual_salario: number
}