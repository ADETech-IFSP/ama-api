import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Breed } from "./BreedModel";

@Entity("species")
class Species{
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @OneToMany(() => Breed, breed => breed.specie)
    breeds: Breed[];
  
}

export { Species }
