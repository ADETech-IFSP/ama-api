import { EntityRepository,Repository } from "typeorm";
import { Comment } from "../entity/CommentModel";

@EntityRepository(Comment)
class CommentRepository extends Repository<Comment>{

}

export{CommentRepository};