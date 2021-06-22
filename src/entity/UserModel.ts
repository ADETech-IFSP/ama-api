import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
class User{

    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    name: string;

    @Column()
    last_name: string;

    @Column()
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

    @Column()
    join_date: Date;

    @Column()
    confirm_code: string;

    @Column()
    verified: boolean;

    @Column()
    user_type: number;

}

export { User };