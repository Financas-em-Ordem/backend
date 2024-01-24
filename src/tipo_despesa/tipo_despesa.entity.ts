import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { DespesaEntity } from 'src/despesa/despesa.entity';

@Entity()
export class TipoDespesaEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    percentual_salario: number

    @OneToMany(() => DespesaEntity, despesa => despesa.tipoDespesa)
    despesas: DespesaEntity[];
}