import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @CreateDateColumn()
    created_date: Date;

    @CreateDateColumn()
    closed_date: Date;

    @Column()
    question_owner: number;
}

export {Question};