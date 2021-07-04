import { Column,CreateDateColumn,Entity,PrimaryGeneratedColumn } from "typeorm";

@Entity("comment")
class Comment{
@PrimaryGeneratedColumn()
readonly id : number;

@Column()
user_id : number;

@Column()
comment : string;

@Column()
is_solution : boolean;

@Column()
question_id : number;

}

export{ Comment };