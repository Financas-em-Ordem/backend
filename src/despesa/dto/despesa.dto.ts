import { IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class DespesaDto {
    @IsNotEmpty({ message: 'Descriçao não pode ser vazio' })
    @IsString()
    descricao: string;

    @IsNotEmpty({ message: 'Data não pode ser vazio' })
    data: string

    @IsNotEmpty({ message: 'Descriçao não pode ser vazio' })
    @IsNumber()
    valor: number
    
    tipoDespesaId: number

    usuarioId: number
}