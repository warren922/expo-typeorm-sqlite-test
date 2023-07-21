import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('todo')
export class Todo {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column("text")
    content!: string;

}
