import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Auth } from "./AuthModel";
import { Pet } from "./PetModel";
import { Planner } from "./PlannerModel";

@Entity("user")
class User{

    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    name: string;

    @Column()
    last_name: string;

    @CreateDateColumn()
    birth_date: Date;

    @Column()
    email: string;

    @Column()
    telephone: string;

    @Column()
    password: string;

    @Column()
    photo_url: string;

    @Column()
    gender: number;

    @CreateDateColumn()
    join_date: Date;

    @Column()
    confirm_code: string;

    @Column()
    verified: boolean;

    @Column()
    user_type: number;

    @OneToMany(() => Pet, pet => pet.owner)
    pets: Pet[];

    @OneToMany(() => Auth, auth => auth.user)
    auth: Auth[];

    @OneToMany(() => Planner, planner => planner.user)
    planner: Planner[];
}

export { User };