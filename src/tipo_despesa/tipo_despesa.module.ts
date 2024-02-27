import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoDespesaService } from './tipo_despesa.service';
import { TipoDespesa } from './tipo_despesa.entity';
import { TipoDespesaContoller } from './tipo_despesa.controller';

@Module({
  imports: [ TypeOrmModule.forFeature([TipoDespesa])],
  controllers: [TipoDespesaContoller],
  providers: [
    TipoDespesaService,
  ],
})
export class TipoDespesaModule {}