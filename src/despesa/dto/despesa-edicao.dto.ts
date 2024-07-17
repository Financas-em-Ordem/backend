import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class DespesaEdicaoDto {
    @ApiProperty({example: 1})
    @IsNotEmpty({ message: 'Id não pode ser vazio' })
    @IsNumber()
    id: number

    @ApiProperty({example: "conta de energia Edit"})
    @IsNotEmpty({ message: 'Descriçao não pode ser vazio' })
    @IsString()
    descricao: string;

    @ApiProperty({example: "2024-02-01"})
    @IsNotEmpty({ message: 'Data não pode ser vazio' })
    data: string

    @ApiProperty({example: 162.33})
    @IsNotEmpty({ message: 'Descriçao não pode ser vazio' })
    @IsNumber()
    valor: number
    
    @ApiProperty({example: 1})
    tipoDespesaId: number

    usuarioId: number
}