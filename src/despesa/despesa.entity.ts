import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, JoinTable } from 'typeorm';
import { TipoDespesaEntity } from 'src/tipo_despesa/tipo_despesa.entity';

@Entity()
export class DespesaEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    descricao: string;

    @Column()
    data: string

    @Column()
    valor: Number

    @ManyToOne(() => TipoDespesaEntity, (tipo) => tipo.despesas, {
        eager: true,
    })
    tipoDespesa: TipoDespesaEntity;
}