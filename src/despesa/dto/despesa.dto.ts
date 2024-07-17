import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class DespesaDto {
    @ApiProperty({example: "conta de energia"})
    @IsNotEmpty({ message: 'Descriçao não pode ser vazio' })
    @IsString()
    descricao: string;

    @ApiProperty({example: "2024-07-02"})
    @IsNotEmpty({ message: 'Data não pode ser vazio' })
    data: string

    @ApiProperty({example: 182.9})
    @IsNotEmpty({ message: 'Descriçao não pode ser vazio' })
    @IsNumber()
    valor: number
    
    @ApiProperty({example: 1})
    tipoDespesaId: number
    
    usuarioId: number
}