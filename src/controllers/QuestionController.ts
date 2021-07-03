import { Request, Response } from "express";
import { QuestionRepository } from "../repository/QuestionRepository";
import { getCustomRepository } from "typeorm";
import { isLoggedIn } from "../services/Auth";
export class QuestionController {

    async create(request: Request, response: Response) {
        let {
            title,
            question,
            vote_down,
            vote_up,
            state,
            question_owner,
        } = request.body;

        const questionRepository = getCustomRepository(QuestionRepository);
        
        if (!question || !title) {
        return response.json({
        status: "error",
        message: "Question or title is empty!"
        }).status(404);
        }

        const newQuestion = questionRepository.create({
            title,
            question,
            vote_down,
            vote_up,
            state,
            question_owner
        });

        await questionRepository.save(newQuestion);

        return response.json({
            status: "success",
            message: "Question successfully added!",
            newQuestion
        }).status(201);
    }
    
    async read(request: Request, response: Response) {
        const {
            id
        } = request.params;

        const questionRepository = getCustomRepository(QuestionRepository);
        const question = await questionRepository.findOne({
            id: Number(id)
        }) 

        if (!question) {
            return response.json({
                staus: "error",
                message: "Question not found."
            }).status(404);
        }
        return response.json({
            status: "success",
            message: "Question found successfully!",
            question
        }).status(200);
    }

    async update(request: Request, response: Response){
        const {
            title,
            question,
            vote_down,
            vote_up,
            state,
            question_owner,
            token
        } = request.body;
        
        let id = Number(request.params.id);

        const user = await isLoggedIn(token);

        if(!user) {
            return response.status(500).json({
                status:"error",
                message:"Session expired!"
            });
        }

        const questionRepository = getCustomRepository(QuestionRepository);
        const updatedQuestion = {
            title,
            vote_down,
            vote_up,
            state,
            question_owner,
            id
        }
        await questionRepository.update(id, updatedQuestion);

        return response.status(201).json({
            status:"success",
            message: "Question successfully updated!",
            question
        })
    }

    async delete(request: Request, response: Response){
        const {
            id
        } = request.params;

      const questionRepository = getCustomRepository(QuestionRepository);
      const question = await questionRepository.findOne({
          id: Number(id)
      });
      
      if(!question){
          return response.json({
              status: "error",
              message: "Question not found." 
          }).status(404);
      }

      await questionRepository.delete({
          id: Number(id)
      })
      return response.json({
          status: "success",
          message: "Question successfully deleted!",
          question
      })
    }
}
