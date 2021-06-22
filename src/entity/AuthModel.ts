import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn  } from "typeorm";

@Entity("auth")
class Auth {

    @PrimaryColumn()    
    readonly id : number;

    @Column()
    user_id : number;

    @Column()
    token : string;
        
    @Column()
    created_date : Date;

    @Column()
    expira_date : Date; 

}
export{Auth}