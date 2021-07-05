import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn  } from "typeorm";

@Entity("auth")
class Auth {

    @PrimaryGeneratedColumn()    
    readonly id : number;

    @Column()
    user_id : number;

    @Column()
    token : string;
        
    @CreateDateColumn()
    created_date : Date;

    @CreateDateColumn()
    expire_date : Date; 

}
export{Auth}