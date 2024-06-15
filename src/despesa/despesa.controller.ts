import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { Despesa } from "./despesa.entity";
import { DespesaService } from "./despesa.service";
import { DespesaDto } from "./dto/despesa.dto";
import { DespesaPaginacaoDTO } from "./dto/despesa-paginacao.dto";
import { DespesaEdicaoDto } from "./dto/despesa-edicao.dto";
import { IsPublic } from "src/auth/decorators/is-public.decorator";
import { DespesaTipoPaginacaoDTO } from "./dto/despesa-tipo-paginacao.dto";
import { DespesasDatasDTO } from "./dto/despesas-datas-dto";
import { DespesaPersonalizadaDTO } from "./dto/despesa-personalizada.dto";

@Controller('despesa')
export class DespesaContoller {
    constructor(private readonly despesaService: DespesaService) { }

    @Get('listar')
    async listar(): Promise<Despesa[]> {
        return this.despesaService.findAll()
    }

    @Get('usuario/:id')
    async listarPorUsuario(@Param("id") id: number): Promise<Despesa[]> {
        return this.despesaService.listarDespesasUsuario(id)
    }

    @Post('salvar')
    async salvarDespesa(@Body() despesa: DespesaDto): Promise<Despesa> {

        return this.despesaService.salvarDespesa(despesa);
    }

    @Post('salvu98jik ')
    async salvarVariasDespesas(@Body() despesas: DespesaDto[]) {
        return this.despesaService.salvarVarias(despesas)
    }
    @Delete("deletar/:id")
    async deletarDespesa(@Param("id") id: number): Promise<string> {
        return this.despesaService.deletarDespesa(id);
    }

    @Patch("atualizar")
    async atualizarDespesa(@Body() despesa: DespesaEdicaoDto) {
        return this.despesaService.atualizarDespesa(despesa)
    }

    @Post("listar-periodo-anual")
    async listarPorPeriodoAnual(@Body() dados) {
        return this.despesaService.getDespesasNoPeriodoAnual(dados.usuarioId, dados.data_inicial, dados.data_final)
    }

    @Post("listar-periodo/:id")
    async listarPorPeriodo(@Param("id") idUser:number, @Body() paginacaoDTO: DespesaPaginacaoDTO) {
        return this.despesaService.getDespesasPeriodoPaginacao(idUser, paginacaoDTO)
    }

    @Get("listar-dez-ultimas/:id")
    async listarDezUltimas(@Param("id") id: number): Promise<Despesa[]> {
        return this.despesaService.listarUltimasDezDespesas(id);
    }

    @Post("despesas-tipo/:id")
    async falmengo(@Param("id") idUser : number, @Body() periodo: DespesasDatasDTO) {
        return this.despesaService.getValorTotalDespesasPorTipo(idUser,  periodo)
    }

    @Post('listar-tipo/:id')
    async listarTipo(@Param("id") id : number, @Body() paginacaoDTO: DespesaTipoPaginacaoDTO){

        return this.despesaService.getDespesasTipo(id, paginacaoDTO)
    }

    @Post('listagem-personalizada/:id')
    async listagemPersonalizada(@Param('id') idUser: number, @Body() despesaDTO: DespesaPersonalizadaDTO){
        return  await this.despesaService.getDespesasTipoPersonalizada(idUser, despesaDTO)
        //return console.log({data: despesaDTO, id: idUser})
    }
}