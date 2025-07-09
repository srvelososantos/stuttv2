import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
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

    @ManyToOne(() => User, (user) => user.books, { eager: true } )
    user: User
}
