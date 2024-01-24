import { IsNotEmpty, IsNumber} from 'class-validator';
export class TipoDespesaDto {

    @IsNotEmpty({message: "O nome nao pode estar vazio"})
    nome: string;

    @IsNotEmpty({message: "O percentual nao pode estar vazio"})
    @IsNumber()
    percentual_salario: number
}