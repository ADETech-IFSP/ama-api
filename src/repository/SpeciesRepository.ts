import { EntityRepository, Repository } from "typeorm";
import { Species } from "../entity/SpeciesModel";

@EntityRepository(Species)
class SpeciesRepository extends Repository<Species>{

}

export {SpeciesRepository};