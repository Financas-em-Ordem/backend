import { Injectable, Inject } from '@nestjs/common';
import { Between, In, Repository } from 'typeorm';
import { Despesa } from './despesa.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DespesaDto } from './dto/despesa.dto';
import { TipoDespesa } from 'src/tipo_despesa/tipo_despesa.entity';
import { Usuario } from 'src/usuario/usuario.entity';
import { DespesaEdicaoDto } from './dto/despesa-edicao.dto';
import { DespesaPersonalizadaDTO } from './dto/despesa-personalizada.dto';
import { format, lastDayOfMonth, startOfMonth } from 'date-fns';

@Injectable()
export class DespesaService {
  constructor(
    @InjectRepository(Despesa)
    private readonly despesaRepository: Repository<Despesa>,

    @InjectRepository(TipoDespesa)
    private readonly tipoDesepsaRepository: Repository<TipoDespesa>,

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) { }

  private readonly primeiroDiaMes = format(startOfMonth(new Date()), 'yyyy-MM-dd');
  private readonly ultimoDiaMes = format(lastDayOfMonth(new Date()), 'yyyy-MM-dd');

  async findAll(): Promise<Despesa[]> {
    return this.despesaRepository.find();
  }

  async salvarDespesa(despesa: DespesaDto): Promise<Despesa> {
    let novaDespesa = new Despesa();
    novaDespesa.descricao = despesa.descricao;
    novaDespesa.data = despesa.data;
    novaDespesa.valor = despesa.valor;
    novaDespesa.tipoDespesa = await this.tipoDesepsaRepository.findOneBy({ id: despesa.tipoDespesaId })
    novaDespesa.usuario = await this.usuarioRepository.findOneBy({ id: despesa.usuarioId })

    return this.despesaRepository.save(novaDespesa);
  }

  salvarVarias(despesas: DespesaDto[]) {
    despesas.forEach(async despesa => {
      let novaDespesa = new Despesa();
      novaDespesa.descricao = despesa.descricao;
      novaDespesa.data = despesa.data;
      novaDespesa.valor = despesa.valor;
      novaDespesa.tipoDespesa = await this.tipoDesepsaRepository.findOneBy({ id: despesa.tipoDespesaId })
      novaDespesa.usuario = await this.usuarioRepository.findOneBy({ id: despesa.usuarioId })

      return this.despesaRepository.save(novaDespesa);
    })
  }

  async deletarDespesa(id: number) {
    this.despesaRepository.delete(id);
    return "deletou"
  }

  async atualizarDespesa(despesa: DespesaEdicaoDto, userID: number) {
    let novaDespesa = new Despesa();
    novaDespesa.descricao = despesa.descricao;
    novaDespesa.data = despesa.data;
    novaDespesa.valor = despesa.valor;
    novaDespesa.tipoDespesa = await this.tipoDesepsaRepository.findOneBy({ id: despesa.tipoDespesaId })
    novaDespesa.usuario = await this.usuarioRepository.findOneBy({ id: userID })

    return this.despesaRepository.update(despesa.id, novaDespesa)
  }

  async listarDespesasUsuario(id: number): Promise<Despesa[]> {
    return await this.despesaRepository.find({ where: { usuario: { id: id } } })
  }

  async listarUltimasDezDespesas(id: number): Promise<Despesa[]> {
    return await this.despesaRepository
      .find({
        where: { usuario: { id: id } },
        take: 10,
        order: { data: 'DESC' }
      })
  }

  async getDespesasDoMes(idUser: number, pagina: number) {
    const qtdDespesas = await this.despesaRepository
      .count({
        where: {
          usuario: { id: idUser },
          data: Between(this.primeiroDiaMes, this.ultimoDiaMes)
        }
      })

    const despesas = await this.despesaRepository
      .find({
        where: {
          usuario: { id: idUser },
          data: Between(this.primeiroDiaMes, this.ultimoDiaMes)
        },
        skip: (pagina - 1) * 10,
        take: 10,
        order: { data: 'DESC' }
      })

    const itensProxPagina = qtdDespesas > ((pagina - 1) * 10) + 10;

    return { despesas, itensProxPagina }
  }

  async getValorTotalDespesasPorTipo(id: number) {
    return this.despesaRepository
      .createQueryBuilder('despesa')
      .select('despesa.tipoDespesa', 'tipoDespesa')
      .addSelect('SUM(despesa.valor)', 'total_despesa')
      .where('despesa.usuario.id = :usuarioId', { usuarioId: id })
      .andWhere('despesa.data BETWEEN :dataInicio AND :dataFim', { dataInicio: this.primeiroDiaMes, dataFim: this.ultimoDiaMes })
      .groupBy('despesa.tipoDespesa')
      .getRawMany();
  }

  async getDespesasTipo(id: number, tipoID: number) {
    return await this.despesaRepository
      .find({
        where: {
          usuario: { id: id },
          tipoDespesa: { id: tipoID },
          data: Between(this.primeiroDiaMes, this.ultimoDiaMes)
        },
        take: 5
      });
  }

  async getDespesasTipoPersonalizada(id: number, despesaDTO: DespesaPersonalizadaDTO) {
    const qtdDespesas = await this.despesaRepository
      .count({
        where: {
          usuario: { id: id },
          tipoDespesa: { id: In(despesaDTO.tiposId), },
          data: Between(despesaDTO.data_inicial, despesaDTO.data_final)
        }
      })
    const despesas = await this.despesaRepository
      .find({
        where: {
          usuario: { id: id },
          tipoDespesa: { id: In(despesaDTO.tiposId) },
          data: Between(despesaDTO.data_inicial, despesaDTO.data_final)
        },
        skip: (despesaDTO.pagina - 1) * despesaDTO.itens_pagina,
        take: despesaDTO.itens_pagina,
        order: { data: 'DESC' }
      })

    const itensProxPagina = qtdDespesas > ((despesaDTO.pagina - 1) * despesaDTO.itens_pagina) + despesaDTO.itens_pagina;

    return { qtdDespesas, itensProxPagina, despesas }
  }
}