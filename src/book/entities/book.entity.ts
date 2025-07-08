import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Book {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    author: string

    @Column()
    filename: string

    @Column({ type: 'bytea' })
    data: Buffer

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    uploadedAt: Date
}
