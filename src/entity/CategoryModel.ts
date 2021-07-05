import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("category")
class Category{
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    name: string;

    @Column()
    description: string;
    
}

    export{ Category };