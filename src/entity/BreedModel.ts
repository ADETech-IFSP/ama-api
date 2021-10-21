import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Pet } from "./PetModel";
import { Species } from "./SpeciesModel";

@Entity("breed")
class Breed {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    name: string;

    @ManyToOne(() => Species, specie => specie.breeds)
    specie: Species;
    
    @Column()
    description: string;

    @OneToMany(() => Pet, pet => pet.breed)
    pets: Pet[];
}

export { Breed };