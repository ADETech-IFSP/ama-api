import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Breed } from "./BreedModel";
import { Food } from "./FoodModel";
import { Task } from "./TaskModel";
import { User } from "./UserModel";

@Entity("pet")
class Pet{
    @PrimaryGeneratedColumn()   
    readonly id: number;
    
    @Column()
    name: string;
    
    @ManyToOne(() => Breed, breed => breed.pets)
    breed: Breed;    
     
    @CreateDateColumn()
    birth_date: Date;

    @Column()
    gender: boolean;

    @Column()
    photo_url: string;

    @CreateDateColumn()
    join_date: Date;

    @Column()
    description: string;

    @ManyToOne(() => User, user => user.pets)
    owner: User;

    @OneToMany(() => Food, food => food.pet)
    foods: Food[]

    @OneToMany(() => Task, task => task.pet)
    tasks: Task[]
}

export{ Pet };