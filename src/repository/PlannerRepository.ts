import { EntityRepository, Repository } from "typeorm";
import { Planner } from "../entity/PlannerModel"; 

@EntityRepository(Planner)
class PlannerRepository extends Repository<Planner> {

}

export {PlannerRepository};