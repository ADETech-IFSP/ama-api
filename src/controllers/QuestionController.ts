import { Request, Response } from "express";
import { QuestionRepository } from "../repository/QuestionRepository";
import { getCustomRepository } from "typeorm";
import { title } from "process";

export class QuestionController {

    async create(request: Request, response: Response) {
        let {
            title,
            question,
            vote_down,
            vote_up,
            state,
            user_id,
        } = request.body;

        //if (question == null|| question == "" || title == null || title == "")

        const questionRepository = getCustomRepository(QuestionRepository);

        const question_owner = Number(user_id);

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
            message: "Question add with success!",
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
                message: "Question has not found."
            }).status(404);
        }
        return response.json({
            status: "success",
            message: "Question has found with success!",
            question
        }).status(200);
   }
}
