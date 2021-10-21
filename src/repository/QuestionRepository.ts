import { EntityRepository, Repository } from "typeorm";
import { Question } from "../entity/QuestionModel" ;

@EntityRepository(Question)
class QuestionRepository extends Repository<Question>{

}

export { QuestionRepository };