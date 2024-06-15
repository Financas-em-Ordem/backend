import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { TipoDespesa } from "./tipo_despesa.entity";
import { TipoDespesaService } from "./tipo_despesa.service";
import { TipoDespesaDto } from "./dto/tipo_despesa.dto";
import { IsPublic } from "src/auth/decorators/is-public.decorator";
import { TipoDespesaEdicaoDto } from "./dto/tipo_despesa_editar.dto";

@Controller('tipo_despesa')
export class TipoDespesaContoller{
    constructor(private readonly tipoDespesaService: TipoDespesaService){}

    @Get("listar")
    async listar(): Promise<TipoDespesa[]>{
        return await this.tipoDespesaService.listar();
    }
    @IsPublic()
    @Post()
    async salvar(@Body() tipo_despesa: TipoDespesaDto): Promise<TipoDespesaDto>{
        return this.tipoDespesaService.salvar(tipo_despesa)
    }

    @IsPublic()
    @Post('varios')
    async salvarVarios(@Body() tipos_despesa: TipoDespesa[]){
        return this.tipoDespesaService.salvarVarias(tipos_despesa)
    }
    @Delete(":id")
    async deletarDespesa(@Param("id") id: number): Promise<string>{
        return this.tipoDespesaService.deletarDespesa(id);
    }

    @Patch()
    async atualizarDespesa(@Body() despesa: TipoDespesaEdicaoDto){
        return this.tipoDespesaService.atualizarDespesa(despesa)
    }
}