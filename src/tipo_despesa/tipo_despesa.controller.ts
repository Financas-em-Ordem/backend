import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { TipoDespesa } from "./tipo_despesa.entity";
import { TipoDespesaService } from "./tipo_despesa.service";
import { TipoDespesaDto } from "./dto/tipo_despesa.dto";

@Controller('tipo_despesa')
export class TipoDespesaContoller{
    constructor(private readonly tipoDespesaService: TipoDespesaService){}

    @Get("listar")
    async listar(): Promise<TipoDespesa[]>{
        return this.tipoDespesaService.listar();
    }

    @Post()
    async salvar(@Body() tipo_despesa: TipoDespesaDto): Promise<TipoDespesaDto>{
        return this.tipoDespesaService.salvar(tipo_despesa)
    }

    @Delete(":id")
    async deletarDespesa(@Param("id") id: number): Promise<string>{
        return this.tipoDespesaService.deletarDespesa(id);
    }

    @Patch(":id")
    async atualizarDespesa(@Param("id") id: number, @Body() despesa: TipoDespesaDto){
        return this.tipoDespesaService.atualizarDespesa(id, despesa)
    }
}