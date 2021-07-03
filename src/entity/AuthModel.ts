import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn  } from "typeorm";

@Entity("auth")
class Auth {

    @PrimaryColumn()    
    readonly id : number;

    @Column()
    user_id : number;

    @Column()
    token : string;
        
    @CreateDateColumn()
    created_date : Date;

    @CreateDateColumn()
    expira_date : Date; 

}
export{Auth}