import { Exclude } from 'class-transformer';
import { Role } from 'src/auth/roles.enum';
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

    @Column({length: 14})
    cpf: string

    @Column()
    salario: number 

    @Column()
    senha: string

    @Column({type: 'enum', enum: Role})
    roles: Role

    @OneToMany(() => Despesa, (despesa) => despesa.usuario)
    despesas: Despesa[]
    
}