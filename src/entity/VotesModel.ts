import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Votes")
class Votes {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    vote: number;

    @Column()
    user_id: number;

    @Column()
    question_id: number;
}

export { Votes };