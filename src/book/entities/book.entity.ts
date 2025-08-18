import { IsEnum } from "class-validator";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


export enum Voices {
    M = 'Male',
    F = 'Female'
}


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

    @Column()
    key: string

    @Column()
    progress: number

    @Column({
        type: 'enum',
        enum: Voices,
        nullable: false,
        default: 'Male'
    })
    @IsEnum(Voices)
    voice: Voices 

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    uploadedAt: Date

    @ManyToOne(() => User, (user) => user.books, { eager: true } )
    user: User
}
