import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TipoDespesaEntity } from './tipo_despesa.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoDespesaDto } from './dto/tipo_despesa.dto';

@Injectable()
export class TipoDespesaService {
    constructor(
        @InjectRepository(TipoDespesaEntity)
        private readonly tipoDespesaRepository: Repository<TipoDespesaEntity>,
    ) { }
    
    async listar(): Promise<TipoDespesaEntity[]>{
        return this.tipoDespesaRepository.find();
    }

    async salvar(tipo_despesa: TipoDespesaDto) {
        return this.tipoDespesaRepository.save(tipo_despesa);
    }

    async deletarDespesa(id: number){
        this.tipoDespesaRepository.delete(id);
        return "deletou"
     }
   
     async atualizarDespesa(id: number, despesa: TipoDespesaDto){
       return this.tipoDespesaRepository.update(id, despesa)
     }
}