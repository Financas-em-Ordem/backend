import { Transform } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class DespesaPersonalizadaDTO{
    @IsNotEmpty({message: "A lista de tipo de despesas nao pode estar vazia"})
    @IsArray()
    tiposId: Array<number>;

    @IsNotEmpty({message: "A data inicial nao pode estar vazia"})
    @IsString()
    data_inicial: string;

    @IsNotEmpty({message: "A data final nao pode estar vazia"})
    @IsString()
    data_final: string;

    @IsNotEmpty({message: "O índice da paginaçao nao pode estar vazio"})
    @IsNumber()
    @Transform(pagina => parseInt(pagina.value))
    pagina: number;

    @IsNotEmpty({message: "A quantidade de itens por página nao pode estar vazia"})
    @IsNumber()
    @Transform(itens_pagina => parseInt(itens_pagina.value))
    itens_pagina: number;
}