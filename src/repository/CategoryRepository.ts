import { Repository } from "typeorm";
import { Category } from "../entity/CategoryModel";

class CategoryRepository extends Repository<Category>{

}

export {CategoryRepository};