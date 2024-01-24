import { IsNotEmpty, IsNumber} from 'class-validator';

export class DespesaDto {
    @IsNotEmpty({ message: 'Descriçao não pode ser vazio' })
    descricao: string;

    @IsNotEmpty({ message: 'Data não pode ser vazio' })
    data: string

    @IsNotEmpty({ message: 'Descriçao não pode ser vazio' })
    @IsNumber()
    valor: number

    @IsNotEmpty({ message: 'Tipo de despesa não pode ser vazio' })
    tipoDespesaId: number

}