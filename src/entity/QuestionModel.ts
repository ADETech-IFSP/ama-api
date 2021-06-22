import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("question")
class Question{
    
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    title: string;

    @Column()
    question: string;

    @Column()
    vote_down: number;

    @Column()
    vote_up: number;

    @Column()
    state: number;

    @Column()
    created_date: Date;

    @Column()
    closed_date: Date;

    @Column()
    question_owner: number;
}

export {Question};