import { EntityRepository, Repository } from "typeorm";
import { User } from "../entity/UserModel";

@EntityRepository(User)
class UserRepository extends Repository<User>{
    async getUser(id : number){    
        return await this.findOne({
            id
        })
    }
    
    async getUserByNumber(telephone : string){        
        return await this.findOne({
            telephone
        })
    }

    async getUserByEmail(email : string){        
        return await this.findOne({
            email
        })
    }
}

export { UserRepository };