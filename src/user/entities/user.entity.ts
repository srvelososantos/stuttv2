import { Book } from "src/book/entities/book.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
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

    @OneToMany(() => Book, (book) => book.user)
    books: Book[];


}
