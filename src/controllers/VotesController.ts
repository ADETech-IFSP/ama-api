import { Request, Response } from "express";
import { getCustomRepository, UpdateDateColumn } from "typeorm";
import { VotesRepository } from "../repository/VotesRepository";
import { isLoggedIn } from "../services/Auth";

export class VotesController {

    async create(request: Request, response: Response) {
        let {
            vote,
            user_id,
            question_id
        } = request.body;

        const votesRepository = getCustomRepository(VotesRepository);
        const votes = votesRepository.create({
            vote,
            user_id,
            question_id
        });

        await votesRepository.save(votes);

        return response.json({
            status: "success",
            message: "Vote successfully added"
        }).status(201);
    }

    async read(request: Request, response: Response) {
        const {
            id
        } = request.params;

        const votesRepository = getCustomRepository(VotesRepository);
        const vote = await votesRepository.findOne({
            id: Number(id)
        })

        if (!vote) {
            return response.json({
                status: "error",
                message: "Vote has not found"
            }).status(404);
        }
        return response.json({
            status: "success",
            message: "Vote successfully has found",
            vote
        }).status(200);
    }

    async update(request: Request, response: Response) {
        const {
            votes,
            user_id,
            question_id,
            token
        } = request.body;

        let id = Number(request.params.id);

        const user = await isLoggedIn(token);

        if (!user) {
            return response.status(500).json({
                status: "error",
                message: "Expired session!"
            });
        }

        const votesRepository = getCustomRepository(VotesRepository);
        //  const votes_verification = await votesRepository.findOne(id);
        //    if (votes_verification.question_id != user_id || !votes_verification){  
        //    return response.json({
        //          status: "error",
        //          message: "Votes has not found" 
        //    )}.status(404);
        //  }

        const updatedVotes ={
            votes,
            user_id,
            question_id,
            id
        }

        await votesRepository.update(id, updatedVotes);

        return response.status(201).json({
            status: "success",
            message: "Votes successfully updated"
        })
    }

    async delete(request: Request, response: Response) {
        const {
            id
        } = request.params;

        const votesRepository = getCustomRepository(VotesRepository);
        const votes = await votesRepository.findOne({
            id: Number(id)
        });

        if(!votes) {
            return response.json({
                status: "error",
                message: "Vote has not found!"
            }).status(404);
        }

        await votesRepository.delete({
            id: Number(id)
        })

        return response.json({
            status: "success",
            message: "Vote successfully has found!",
            votes
        })
    }
}