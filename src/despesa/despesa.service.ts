import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Despesa } from './despesa.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DespesaDto } from './dto/despesa.dto';
import { TipoDespesa } from 'src/tipo_despesa/tipo_despesa.entity';
import { Usuario } from 'src/usuario/usuario.entity';

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

  async deletarDespesa(id: number) {
    this.despesaRepository.delete(id);
    return "deletou"
  }

  async atualizarDespesa(id: number, despesa: DespesaDto) {
    let novaDespesa = new Despesa();
    novaDespesa.descricao = despesa.descricao;
    novaDespesa.data = despesa.data;
    novaDespesa.valor = despesa.valor;
    novaDespesa.tipoDespesa = await this.tipoDesepsaRepository.findOneBy({ id: despesa.tipoDespesaId })
    novaDespesa.usuario = await this.usuarioRepository.findOneBy({ id: despesa.usuarioId })

    return this.despesaRepository.update(id, novaDespesa)
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
}