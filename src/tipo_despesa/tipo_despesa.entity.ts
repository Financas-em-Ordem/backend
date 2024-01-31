import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Despesa } from 'src/despesa/despesa.entity';

@Entity()
export class TipoDespesa {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    percentual_salario: number

    @OneToMany(() => Despesa, despesa => despesa.tipoDespesa)
    despesas: Despesa[];
}