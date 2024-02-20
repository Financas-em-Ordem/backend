import { IsNotEmpty, IsString } from "class-validator";

export class DespesasDatasDTO{
    @IsNotEmpty({message: "A data inicial nao pode estar vazia"})
    @IsString()
    data_inicial: string;

    @IsNotEmpty({message: "A data final nao pode estar vazia"})
    @IsString()
    data_final: string;
}