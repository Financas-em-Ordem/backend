import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class DespesaTipoPaginacaoDTO{
    @IsNotEmpty({message: "O id do tipo de despesa nao pode estar vazio"})
    @IsNumber()
    tipoId: number;

    @IsNotEmpty({message: "A data inicial nao pode estar vazia"})
    @IsString()
    data_inicial: string;

    @IsNotEmpty({message: "A data final nao pode estar vazia"})
    @IsString()
    data_final: string;

    @IsNotEmpty({message: "O índice da paginaçao nao pode estar vazio"})
    @IsNumber()
    pagina: number;

    @IsNotEmpty({message: "A quantidade de itens por página nao pode estar vazia"})
    @IsNumber()
    itens_pagina: number;
       
}