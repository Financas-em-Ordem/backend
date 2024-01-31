import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DespesaService } from './despesa.service';
import { Despesa } from './despesa.entity';
import { DespesaContoller } from './despesa.controller';
import { TipoDespesa } from 'src/tipo_despesa/tipo_despesa.entity';
import { Usuario } from 'src/usuario/usuario.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([Despesa, TipoDespesa, Usuario])],
  controllers: [DespesaContoller],
  providers: [
    DespesaService,
  ],
})
export class DespesaModule {}