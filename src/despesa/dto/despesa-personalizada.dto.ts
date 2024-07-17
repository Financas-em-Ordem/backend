import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class DespesaPersonalizadaDTO{
    @ApiProperty({example: [1, 2, 3]})
    @IsNotEmpty({message: "A lista de tipo de despesas nao pode estar vazia"})
    @IsArray()
    tiposId: Array<number>;

    @ApiProperty({example: "2023-06-10"})
    @IsNotEmpty({message: "A data inicial nao pode estar vazia"})
    @IsString()
    data_inicial: string;

    @ApiProperty({example: "2023-04-01"})
    @IsNotEmpty({message: "A data final nao pode estar vazia"})
    @IsString()
    data_final: string;

    @ApiProperty({example: 1})
    @IsNotEmpty({message: "O índice da paginaçao nao pode estar vazio"})
    @IsNumber()
    @Transform(pagina => parseInt(pagina.value))
    pagina: number;

    @ApiProperty({example: 10})
    @IsNotEmpty({message: "A quantidade de itens por página nao pode estar vazia"})
    @IsNumber()
    @Transform(itens_pagina => parseInt(itens_pagina.value))
    itens_pagina: number;
}