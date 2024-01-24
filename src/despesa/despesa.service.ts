import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DespesaEntity } from './despesa.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DespesaDto } from './dto/despesa.dto';

@Injectable()
export class DespesaService {
  constructor(
    @InjectRepository(DespesaEntity)
    private readonly despesaRepository: Repository<DespesaEntity>,
  ) {}

  async findAll(): Promise<DespesaEntity[]> {
    return this.despesaRepository.find();
  }

  async salvarDespesa(despesa : DespesaDto): Promise<DespesaEntity>{

    return this.despesaRepository.save(despesa);
  }
 
  async deletarDespesa(id: number){
     this.despesaRepository.delete(id);
     return "deletou"
  }

  async atualizarDespesa(id: number, despesa: DespesaDto){
    return this.despesaRepository.update(id, despesa)
  }
}