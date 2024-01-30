import { Despesa } from 'src/despesa/despesa.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, JoinTable, OneToMany } from 'typeorm';

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string

    @Column({ length: 255 })
    nome_completo: string;

    @Column()
    data_nascimento: string

    @Column({length: 14})
    cpf: string

    @Column()
    senha: string


    @OneToMany(() => Despesa, (despesa) => despesa.usuario)
    despesas: Despesa[]
}