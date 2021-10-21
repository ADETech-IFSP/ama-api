import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Pet } from "./PetModel";
import { User } from "./UserModel";

@Entity("task")
class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    task: string;

    @Column()
    title: string;

    @Column()
    color: string;

    @Column()
    icon: number;

    @CreateDateColumn()
    start_date: Date;

    @CreateDateColumn()
    end_date: Date;

    @ManyToOne(() => Pet, pet => pet.tasks)
    pet: Pet;    
}

export { Task };