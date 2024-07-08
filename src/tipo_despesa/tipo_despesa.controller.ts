import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { TipoDespesa } from "./tipo_despesa.entity";
import { TipoDespesaService } from "./tipo_despesa.service";
import { TipoDespesaDto } from "./dto/tipo_despesa.dto";

import { TipoDespesaEdicaoDto } from "./dto/tipo_despesa_editar.dto";
import { HasRoles } from "src/auth/decorators/roles.decorator";
import { Role } from "src/auth/roles.enum";
import { RolesGuard } from "src/auth/guard/roles-auth.guard";

@Controller('tipo_despesa')
@HasRoles(Role.Admin)
@UseGuards(RolesGuard)
export class TipoDespesaContoller{
    constructor(private readonly tipoDespesaService: TipoDespesaService){}

    @Get("listar")
    @HasRoles(Role.User, Role.Admin)
    async listar(): Promise<TipoDespesa[]>{
       return await this.tipoDespesaService.listar();
    }
    @Post()
    async salvar(@Body() tipo_despesa: TipoDespesaDto): Promise<TipoDespesaDto>{
        return this.tipoDespesaService.salvar(tipo_despesa)
    }
    @Post('varios')
    async salvarVarios(@Body() tipos_despesa: TipoDespesa[]){
        return this.tipoDespesaService.salvarVarias(tipos_despesa)
    }
    @Delete(":id")
    async deletarDespesa(@Param("id") id: number): Promise<string>{
        return this.tipoDespesaService.deletarDespesa(id);
    }
    @Patch('atualizar')
    async atualizarDespesa(@Body() despesa: TipoDespesaEdicaoDto){
        return this.tipoDespesaService.atualizarDespesa(despesa)
    }
}