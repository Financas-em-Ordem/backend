import { IsNotEmpty, IsNumber, IsString} from 'class-validator';
export class TipoDespesaDto {

    @IsNotEmpty({message: "O nome nao pode estar vazio"})
    @IsString()
    nome: string;

    @IsNotEmpty({message: "O percentual nao pode estar vazio"})

    percentual_salario: number
}