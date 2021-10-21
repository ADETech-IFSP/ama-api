import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Pet } from "./PetModel";

@Entity("food")
class Food {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    name: string;

    @ManyToOne(() => Pet, pet => pet.foods)
    pet: Pet;
}

export { Food };