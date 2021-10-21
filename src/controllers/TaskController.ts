import { Request, response, Response } from "express";
import { getCustomRepository } from "typeorm";
import { User } from "../entity/UserModel";
import { TaskRepository } from "../repository/TaskRepository";
import { UserRepository } from "../repository/UserRepository";
import { isLoggedIn } from "../services/Auth";

export class TaskController {
    async create(request: Request, response: Response) {
        let {
            task,
            title, 
            color,
            icon,
            start_date,
            end_date            
        } = request.body;
        const { token } = request.headers;

        const taskRepository = getCustomRepository(TaskRepository);        

        if (!task || !title) {
            return response.json({
                status: "error",
                message: "Task or title is empty!"
            }).status(404);
        }

        const user = await isLoggedIn(token.toString());

        if(!user){
            return response.json({
                status: "error",
                message: "Please, do login to register a new Task!"
            }).status(403);
        }

        const newTask = taskRepository.create({
            task,
            title,
            color,
            icon,
            start_date,
            end_date
        });

        await taskRepository.save(newTask);

        return response.json({
            status: "success",
            message: "Task successfully added!",
            newTask
        }).status(201);
    }

    async read(request: Request, response: Response) {
        const {
            id
        } = request.params;

        const taskRepository = getCustomRepository(TaskRepository);
        const task = await taskRepository.findOne({
            id: Number(id)
        })

        if (!task) {
            return response.json({
                status: "error",
                message: "Task has not found"
            }).status(404);
        }
        return response.json({
            status: "success",
            message: "Task successfully has found!",
            task
        }).status(200);
    }

    async update(request: Request, response: Response) {
        const {
            task,
            title,
            color,
            icon,
            start_date,
            end_date,
            token
        } = request.body;

        let id = Number(request.params.id);

        const user = await isLoggedIn(token);

        if (!user) {
            return response.status(500).json({
                status: "error",
                message: "Session expired!"
            });
        }

        const taskRepository = getCustomRepository(TaskRepository);
        
        const updatedTask = {
            title,
            color,
            icon,
            start_date,
            end_date,
            id
        }

        await taskRepository.update(id, updatedTask);

        return response.status(201).json({
            status: "succcess",
            message: "Task successfully updated",
            task
        })
    }

    async delete(request: Request, response: Response) {
        const {
            id
        } = request.params;

        const taskRepository = getCustomRepository(TaskRepository);

        const task = await taskRepository.findOne({
            id: Number(id)
        });

        if(!task){
            return response.json({
                status: "error",
                message: "Task has not found."
            }).status(404);
        }

        await taskRepository.delete({
            id: Number(id)
        })
        return response.json({
            status: "success",
            message: "Task successfully deleted!"
        })
    }

    async getAllTasks(request: Request, repsonse: Response) {
        var token = (request.headers.token || "").toString();
        const user = await isLoggedIn(token);

        if(!user) {
            return response.status(500).json({
                status: "error",
                message: "Session expired!"
            });
        }

        const taskRepository = getCustomRepository(TaskRepository);
        const tasks = await taskRepository.find({
            id: user.id
        });
        
        return repsonse.status(200).json({
            status: "success",
            message: `Returned ${tasks.length} results.`,
            tasks
        })
    }
}