import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { DespesaEntity } from "./despesa.entity";
import { DespesaService } from "./despesa.service";
import { DespesaDto } from "./dto/despesa.dto";

@Controller('despesa')
export class DespesaContoller{
    constructor(private readonly despesaService: DespesaService){}

    @Get('listar')
    async listar(): Promise<DespesaEntity[]>{
        return this.despesaService.findAll()
    }

    @Post('salvar')
    async salvarDespesa(@Body() despesa: DespesaDto): Promise<DespesaEntity>{
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