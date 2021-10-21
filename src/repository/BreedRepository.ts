import { EntityRepository, Repository } from "typeorm";
import { Breed } from "../entity/BreedModel";

@EntityRepository(Breed)
class BreedRepository extends Repository <Breed>{

}

export { BreedRepository }