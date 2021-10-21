import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn  } from "typeorm";
import { User } from "./UserModel";

@Entity("auth")
class Auth {

    @PrimaryGeneratedColumn()    
    readonly id : number;

    @ManyToOne(() => User, user => user.auth)
    user : User;

    @Column()
    token : string;
        
    @CreateDateColumn()
    created_date : Date;

    @CreateDateColumn()
    expire_date : Date; 

}
export{Auth}