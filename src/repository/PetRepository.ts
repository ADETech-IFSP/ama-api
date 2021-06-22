import { Repository } from "typeorm";
import { Pet } from "../entity/PetModel";

class PetRepository extends Repository<Pet>{

}

export{PetRepository};