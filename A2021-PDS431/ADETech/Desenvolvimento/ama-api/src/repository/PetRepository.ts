import { EntityRepository, Repository } from "typeorm";
import { Pet } from "../entity/PetModel";

@EntityRepository(Pet)
class PetRepository extends Repository<Pet>{

}

export{PetRepository};