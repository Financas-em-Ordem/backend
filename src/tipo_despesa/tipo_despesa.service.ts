import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TipoDespesa } from './tipo_despesa.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoDespesaDto } from './dto/tipo_despesa.dto';
import { TipoDespesaEdicaoDto } from './dto/tipo_despesa_editar.dto';

@Injectable()
export class TipoDespesaService {
    constructor(
        @InjectRepository(TipoDespesa)
        private readonly tipoDespesaRepository: Repository<TipoDespesa>,
    ) { }

    async listar(): Promise<TipoDespesa[]> {
        return this.tipoDespesaRepository.find();
    }

    async salvar(tipo_despesa: TipoDespesaDto) {
        return this.tipoDespesaRepository.save(tipo_despesa);
    }

    async deletarDespesa(id: number) {
        this.tipoDespesaRepository.delete(id);
        return "deletou"
    }

    async atualizarDespesa( tipo_despesa: TipoDespesaEdicaoDto) {
        return this.tipoDespesaRepository.update(tipo_despesa.id, tipo_despesa)
    }

    async salvarVarias (tipos_despesa: TipoDespesaDto[]){
        tipos_despesa.forEach(tipo => {
            this.tipoDespesaRepository.save(tipo);
        });

        return tipos_despesa
    }
}