import { EntityRepository, Repository } from "typeorm";
import { Category } from "../entity/CategoryModel";

@EntityRepository(Category)
class CategoryRepository extends Repository<Category>{

}

export {CategoryRepository};