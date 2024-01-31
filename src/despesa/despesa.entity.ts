import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, JoinTable, OneToMany } from 'typeorm';
import { TipoDespesa } from 'src/tipo_despesa/tipo_despesa.entity';
import { Usuario } from 'src/usuario/usuario.entity';

@Entity()
export class Despesa {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 255 })
    descricao: string

    @Column()
    data: string

    @Column()
    valor: number

    @ManyToOne(() => TipoDespesa, (tipo) => tipo.despesas, {
        eager: true,
    })
    tipoDespesa: TipoDespesa

    @ManyToOne(() => Usuario, (usuario) => usuario.despesas)
    usuario: Usuario
}