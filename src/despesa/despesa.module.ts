import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DespesaService } from './despesa.service';
import { DespesaEntity } from './despesa.entity';
import { DespesaContoller } from './despesa.controller';
import { TipoDespesaEntity } from 'src/tipo_despesa/tipo_despesa.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([DespesaEntity, TipoDespesaEntity])],
  controllers: [DespesaContoller],
  providers: [
    DespesaService,
  ],
})
export class DespesaModule {}