import { EntityRepository, Repository } from "typeorm";
import { Food } from "../entity/FoodModel";

@EntityRepository(Food)
class FoodRepository extends Repository<Food>{

}

export {FoodRepository};