import { Column, PrimaryGeneratedColumn } from "typeorm";

export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    lastName: string

    @Column()
    email: string

    @Column()
    password: string

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
}
