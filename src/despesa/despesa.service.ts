import { Injectable, Inject } from '@nestjs/common';
import { Between, In, Repository } from 'typeorm';
import { Despesa } from './despesa.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DespesaDto } from './dto/despesa.dto';
import { DespesaPaginacaoDTO } from './dto/despesa-paginacao.dto';
import { TipoDespesa } from 'src/tipo_despesa/tipo_despesa.entity';
import { Usuario } from 'src/usuario/usuario.entity';
import { DespesaEdicaoDto } from './dto/despesa-edicao.dto';
import { DespesaTipoPaginacaoDTO } from './dto/despesa-tipo-paginacao.dto';
import { DespesasDatasDTO } from './dto/despesas-datas-dto';
import { DespesaPersonalizadaDTO } from './dto/despesa-personalizada.dto';

@Injectable()
export class DespesaService {
  constructor(
    @InjectRepository(Despesa)
    private readonly despesaRepository: Repository<Despesa>,

    @InjectRepository(TipoDespesa)
    private readonly tipoDesepsaRepository: Repository<TipoDespesa>,

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>
  ) { }

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

  async atualizarDespesa(despesa: DespesaEdicaoDto) {
    let novaDespesa = new Despesa();
    novaDespesa.descricao = despesa.descricao;
    novaDespesa.data = despesa.data;
    novaDespesa.valor = despesa.valor;
    novaDespesa.tipoDespesa = await this.tipoDesepsaRepository.findOneBy({ id: despesa.tipoDespesaId })
    novaDespesa.usuario = await this.usuarioRepository.findOneBy({ id: despesa.usuarioId })

    return this.despesaRepository.update(despesa.id, novaDespesa)
  }

  async listarDespesasUsuario(id: number): Promise<Despesa[]> {
    return await this.despesaRepository.find({
      where: {
        usuario: {
          id: id
        }
      }
    })
  }

  async listarUltimasDezDespesas(id: number): Promise<Despesa[]> {
    return await this.despesaRepository
      .find({
        where: {
          usuario: {
            id: id
          },
        },
        take: 10,
        order: {
          data: 'DESC'
        }
      })
  }

  async getDespesasNoPeriodoAnual(id: number, dataInicial: string, dataFinal: string) {
    return await this.despesaRepository
      .find({
        where: {
          usuario: {
            id: id
          },
          data: Between(dataInicial, dataFinal)
        }
      })
  }

  async getDespesasPeriodoPaginacao(idUser: number, paginacaoDTO: DespesaPaginacaoDTO) {
    const qtdDespesas = await this.despesaRepository
      .count({
        where: {
          usuario: {
            id: idUser
          },
          data: Between(paginacaoDTO.data_inicial, paginacaoDTO.data_final)
        }
      })

    const despesas = await this.despesaRepository
      .find({
        where: {
          usuario: {
            id: idUser
          },
          data: Between(paginacaoDTO.data_inicial, paginacaoDTO.data_final)
        },
        skip: (paginacaoDTO.pagina - 1) * paginacaoDTO.itens_pagina,
        take: paginacaoDTO.itens_pagina,
        order: {
          data: 'DESC'
        }
      })

    const itensProxPagina = qtdDespesas > ((paginacaoDTO.pagina - 1) * paginacaoDTO.itens_pagina) + paginacaoDTO.itens_pagina;

    return { despesas, itensProxPagina }
  }

  async getValorTotalDespesasPorTipo(id: number, periodo: DespesasDatasDTO) {

    return this.despesaRepository
      .createQueryBuilder('despesa')
      .select('despesa.tipoDespesa', 'tipoDespesa')
      .addSelect('SUM(despesa.valor)', 'total_despesa')
      .where('despesa.usuario.id = :usuarioId', { usuarioId: id })
      .andWhere('despesa.data BETWEEN :dataInicio AND :dataFim', { dataInicio: periodo.data_inicial, dataFim: periodo.data_final })
      .groupBy('despesa.tipoDespesa')
      .getRawMany();

  }

  async getDespesasTipo(id: number, paginacaoDTO: DespesaTipoPaginacaoDTO) {

    const qtdDespesas = await this.despesaRepository
      .count({
        where: {
          usuario: {
            id: id
          },
          tipoDespesa: {
            id: paginacaoDTO.tipoId,
          },
          data: Between(paginacaoDTO.data_inicial, paginacaoDTO.data_final)
        }
      })
    const despesas = await this.despesaRepository
      .find({
        where: {
          usuario: {
            id: id
          },
          tipoDespesa: {
            id: paginacaoDTO.tipoId
          },
          data: Between(paginacaoDTO.data_inicial, paginacaoDTO.data_final)
        },
        skip: (paginacaoDTO.pagina - 1) * paginacaoDTO.itens_pagina,
        take: paginacaoDTO.itens_pagina,
        order: {
          data: 'DESC'
        }
      })

    const itensProxPagina = qtdDespesas > ((paginacaoDTO.pagina - 1) * paginacaoDTO.itens_pagina) + paginacaoDTO.itens_pagina;

    return {itensProxPagina, despesas}
  }


  async getDespesasTipoPersonalizada(id: number, despesaDTO: DespesaPersonalizadaDTO){

    const qtdDespesas = await this.despesaRepository
      .count({
        where: {
          usuario: {
            id: id
          },
          tipoDespesa: {
            id: In(despesaDTO.tiposId),
          },
          data: Between(despesaDTO.data_inicial, despesaDTO.data_final)
        }
      })
    const despesas = await this.despesaRepository
      .find({
        where: {
          usuario: {
            id: id
          },
          tipoDespesa: {
            id: In(despesaDTO.tiposId)
          },
          data: Between(despesaDTO.data_inicial, despesaDTO.data_final)
        },
        skip: (despesaDTO.pagina - 1) * despesaDTO.itens_pagina,
        take: despesaDTO.itens_pagina,
        order: {
          data: 'ASC'
        }
      })

    const itensProxPagina = qtdDespesas > ((despesaDTO.pagina - 1) * despesaDTO.itens_pagina) + despesaDTO.itens_pagina;

    return {qtdDespesas, itensProxPagina, despesas}
  }
}