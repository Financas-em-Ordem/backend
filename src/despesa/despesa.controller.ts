import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards } from "@nestjs/common";
import { Despesa } from "./despesa.entity";
import { DespesaService } from "./despesa.service";
import { DespesaDto } from "./dto/despesa.dto";
import { DespesaEdicaoDto } from "./dto/despesa-edicao.dto";

import { DespesaPersonalizadaDTO } from "./dto/despesa-personalizada.dto";
import { Role } from "src/auth/roles.enum";
import { RolesGuard } from "src/auth/guard/roles-auth.guard";
import { HasRoles } from "src/auth/decorators/roles.decorator";

@Controller('despesa')
@HasRoles(Role.Admin, Role.User)
@UseGuards(RolesGuard)
export class DespesaContoller {
    constructor(private readonly despesaService: DespesaService) { }

    @Get('listar')
    async listar(): Promise<Despesa[]> {
        return await this.despesaService.findAll()
    }

    @Get('usuario')
    async listarPorUsuario(@Request() req): Promise<Despesa[]> {
        return await this.despesaService.listarDespesasUsuario(req.user.id)
    }

    @Post('salvar')
    async salvarDespesa(@Body() despesa: DespesaDto): Promise<Despesa> {
        return await this.despesaService.salvarDespesa(despesa);
    }

    @Delete("deletar/:id")
    async deletarDespesa(@Param("id") id: number): Promise<string> {
        return await this.despesaService.deletarDespesa(id);
    }

    @Patch("atualizar")
    async atualizarDespesa(@Request() req: any, @Body() despesa: DespesaEdicaoDto) {
        return await this.despesaService.atualizarDespesa(despesa, req.user.id)
    }
    
    @Get("listar-mes-atual/:pagina")
    async listarPorPeriodo(@Param('pagina') pagina : number, @Request() req: any) {
        return await this.despesaService.getDespesasDoMes(req.user.id, pagina)
    }

    @Get("listar-dez-ultimas")
    async listarDezUltimas(@Request() req: any): Promise<Despesa[]> {
        return await this.despesaService.listarUltimasDezDespesas(req.user.id);
    }

    @Get("despesas-tipo")
    async getValorTotalDespesasPorTipo(@Request() req: any) {
        return await this.despesaService.getValorTotalDespesasPorTipo(req.user.id)
    }

    @Get('listar-tipo/:id')
    async listarTipo(@Param('id') tipoID: number, @Request() req: any) {
        return await this.despesaService.getDespesasTipo(req.user.id, tipoID)
    }

    @Get('listagem-personalizada')
    async listagemPersonalizada(@Query() data: DespesaPersonalizadaDTO, @Request() req: any) {
        return await this.despesaService.getDespesasTipoPersonalizada(req.user.id, data)
    }
}
