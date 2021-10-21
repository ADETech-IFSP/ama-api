import { EntityRepository, Repository } from "typeorm";
import { Auth } from "../entity/AuthModel";

@EntityRepository(Auth)
class AuthRepository extends Repository <Auth>{

}

export { AuthRepository }