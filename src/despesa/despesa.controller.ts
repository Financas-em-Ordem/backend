import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { Despesa } from "./despesa.entity";
import { DespesaService } from "./despesa.service";
import { DespesaDto } from "./dto/despesa.dto";

@Controller('despesa')
export class DespesaContoller{
    constructor(private readonly despesaService: DespesaService){}

    @Get('listar')
    async listar(): Promise<Despesa[]>{
        return this.despesaService.findAll()
    }

    @Get('usuario/:id')
    async listarPorUsuario(@Param("id") id: number): Promise<Despesa[]>{
        return this.despesaService.listarDespesasUsuario(id)
    }

    @Post('salvar')
    async salvarDespesa(@Body() despesa: DespesaDto): Promise<Despesa>{

        return this.despesaService.salvarDespesa(despesa);
    }

    @Delete("deletar/:id")
    async deletarDespesa(@Param("id") id: number): Promise<string>{
        return this.despesaService.deletarDespesa(id);
    }

    @Patch("atualizar/:id")
    async atualizarDespesa(@Param("id") id: number, @Body() despesa: DespesaDto){
        return this.despesaService.atualizarDespesa(id, despesa)
    }
}