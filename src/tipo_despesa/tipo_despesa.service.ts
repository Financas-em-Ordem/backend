import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TipoDespesa } from './tipo_despesa.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoDespesaDto } from './dto/tipo_despesa.dto';

@Injectable()
export class TipoDespesaService {
    constructor(
        @InjectRepository(TipoDespesa)
        private readonly tipoDespesaRepository: Repository<TipoDespesa>,
    ) { }
    
    async listar(): Promise<TipoDespesa[]>{
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