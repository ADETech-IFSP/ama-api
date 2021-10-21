import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("comment")
class Comment{
@PrimaryGeneratedColumn()
readonly id : number;

@Column()
user_id : number;

@Column()
comment : string;

@Column()
solved : boolean;

@Column()
question_id : number;
}

export{ Comment };