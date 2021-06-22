import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("pet")
class Pet{
    @PrimaryGeneratedColumn()   
    readonly id: number;
    
    @Column()
    name: string;
    
    @Column()
    breed: string;
    
    @Column()
    category_id: number;
     
    @Column()
    birth_date: Date;

    @Column()
    gender: boolean;

    @Column()
    photo_url: string;

    @Column()
    join_date: Date;

    @Column()
    description: string;

    @Column()
    owner_id: number;
}

export{ Pet };