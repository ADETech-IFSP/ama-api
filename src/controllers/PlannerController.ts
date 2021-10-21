import { Request, response, Response } from "express";
import { getCustomRepository } from "typeorm";
import { PlannerRepository } from "../repository/PlannerRepository";
import { TaskRepository } from "../repository/TaskRepository";
import { isLoggedIn } from "../services/Auth";

export class PlannerController {
    async create(request: Request, repsonse: Response) {
        let {
            to_do,
            state,
            task_id
        } = request.body;
        var token = (request.headers.token || "").toString();

        const user = await isLoggedIn(token);

        if(!user) {
            return response.status(500).json({
                status: "error",
                message: "Expired session!"
            });
        }

        const plannerRepository = getCustomRepository(PlannerRepository);
        const taskRepository = getCustomRepository(TaskRepository);
        const task = await taskRepository.findOne({
            id: Number(task_id)
        })

        const planner = plannerRepository.create({
            to_do,
            state,
            task
        });
        await plannerRepository.save(planner);

        return response.json({
            status: "success",
            message: "Planner add successfully",
            planner
        }).status(201)
    }

    async read(request: Request, response: Response) {
        const {
            id
        } = request.params;

        const plannerRepository = getCustomRepository(PlannerRepository);
        const planner = await plannerRepository.findOne({
            id: Number(id)
        })

        if(!planner){
            return response.json({
                status: "error",
                message: "Task is empty!"
            }).status(404);
        }

        return response.json({
            status: "success",
            message: "Planner successfully has found",
            planner
        }).status(200);
    }

    async update(request: Request, response: Response) {
        const {
            to_do,
            state,
            task_id
        } = request.body;
        let id = Number(request.params.id);
        var token = (request.headers.token || "").toString();

        const user = await isLoggedIn(token);

        if(!user) {
            return response.status(500).json({
                status: "error",
                message: "Session expired!"
            });
        }

        const plannerRepository = getCustomRepository(PlannerRepository);
        const planner = await plannerRepository.findOne(id, {
            relations: ['user']
        });

        if(planner.user != user || !planner) {
            return response.json({
                status: "error",
                message: "Planner has not found"
            }).status(404);
        }

        const updatedPlanner = {
            to_do,
            state,
            task_id
        }
        await plannerRepository.update(id, updatedPlanner);

        return response.status(201).json({
            status: "success",
            message: "Planner has successfully updated",
            updatedPlanner
        })
    }

    async delete(request: Request, response: Response) {
        const {
            id
        } = request.params;

        const plannerRepository = getCustomRepository(PlannerRepository);
        const planner = await plannerRepository.findOne({
            id: Number(id)
        });

        if(!planner) {
            return response.json({
                status: "error",
                message: "Task has not found in planner"
            }).status(404);
        }

        await plannerRepository.delete({
            id: Number(id)
        })

        return response.json({
            status: "success",
            message: "Planner deleted successfully!",
            planner
        })
    }
}