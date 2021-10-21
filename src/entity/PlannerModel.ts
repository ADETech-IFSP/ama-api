import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./TaskModel";
import { User } from "./UserModel";

@Entity("planner")
class Planner {
    @PrimaryGeneratedColumn()
    readonly id: number;
    
    @CreateDateColumn()
    to_do: Date;

    @Column()
    state: number;

    @OneToOne(() => Task)
    @JoinColumn()
    task: Task;

    @ManyToOne(() => User, user => user.planner)
    user: User;
}

export { Planner };
