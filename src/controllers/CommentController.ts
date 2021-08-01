import{Request,Response} from "express";
import { getCustomRepository } from "typeorm";
import { CommentRepository } from "../repository/CommentRepository";
import { isLoggedIn } from "../services/Auth";

export class CommentController{

    async create (request : Request,response:Response){
        let {
            comment,
            is_solution,
            
        } = request.body

        const commentRepository = getCustomRepository(CommentRepository);

        const newComment = commentRepository.create({
            comment,
            is_solution

        });

        await commentRepository.save(newComment);
        
        return response.json({
            status : "success",
            message : "Comment add with success",        
        }).status(201);
    }

    async read (request : Request,response : Response){
        const {
            id
        } = request.params;

        const commentRepository = getCustomRepository(CommentRepository);
        const comment = await commentRepository.findOne({
            id : Number(id)
        })

        if (!comment) {
            return response.json({
                status : "error",
                message : "Comment has not found."
            }).status(404);    
        }
        return response .json({
            status : "sucess",
            message :"Comment has found with success",
            comment
        }).status(200);
  }

  async update (request : Request,response: Response){
      const{
        comment,
        token,
        is_solution
      } = request.body;

      let id = Number(request.params.id);

      const user = await isLoggedIn(token);
      
      if (!user) {
          return response.status(500).json({
              status : "error",
              message : "Session expired"
          });
      }
      const commentRepository = getCustomRepository(CommentRepository);
    //  const comment_verification = await commentRepository.findOne(id);
    //    if (comment_verification.question_id != user_id || !comment_verification){  
    //    return response.json({
    //          status: "error",
    //          message: "comment not found" 
    //    )}.status(404);
    //  }
    
    

      const updatedComment ={
          comment,
          is_solution,
          id
      }
      await commentRepository.update(id,updatedComment);

      return response.status(201).json({
          status : "success",
          message : "Comment succesfully updated"
      })
    }

    async delete(request : Request, response: Response){
        const {
            id
        } = request.params;

        const commentRepository = getCustomRepository(CommentRepository);
        const comment = await commentRepository.findOne({
            id : Number(id)
        });

        if (!comment) {
            return response.json({
                status : "error",
                message : "Comment has not found"
            }).status(404); 
        }
        await commentRepository.delete({
            id : Number (id)
        })
        return response.json({
            status : "success",
            message : "Comment deleted with seccess",
            comment
        })
    }
}