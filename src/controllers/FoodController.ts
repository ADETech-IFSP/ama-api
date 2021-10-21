import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { FoodRepository } from "../repository/FoodRepository";
import { isLoggedIn } from "../services/Auth";

export class FoodController {

    async create(request: Request, response: Response) {
        let {
            name
        } = request.body;

        const foodRepository = getCustomRepository(FoodRepository);

        const FoodAlreadyExists = await foodRepository.findOne({
            name
        });

        if (FoodAlreadyExists) {
            return response.json({
                status: "error",
                message: "Food has not found"
            }).status(503);
        }

        const food = foodRepository.create({
            name
        });

        await foodRepository.save(food);

        return response.json({
            status: "success",
            message: "Food successfully added",
            food
        }).status(201);
    }

    async read(request: Request, response: Response) {
        const {
            id
        } = request.params;

        const foodRepository = getCustomRepository(FoodRepository);
        const food = await foodRepository.findOne({
            id: Number(id)
        })

        if (!food) {
            return response.json({
                status: "error",
                message: "Food has not found"
            }).status(404);
        }
        return response.json({
            status: "success",
            message: "Food successfully added",
            food
        }).status(200);
    }

    async update(request: Request, response: Response) {
        const {
            name,
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

        const foodRepository = getCustomRepository(FoodRepository);
        const updatedFood = {
                name, 
                id
            }

            await foodRepository.update(id, updatedFood);

            return response.status(201).json({
                status: "success",
                message: "Food successfully updated"
            })
        }

        async delete(request: Request, response: Response) {
            const {
                id
            } = request.params;

            const foodRepository = getCustomRepository(FoodRepository);
            const food = await foodRepository.findOne({
                id: Number(id)
            });

            if (!food) {
                return response.json({
                    status: "error",
                    message: "Food has not found"
                }).status(404);
            }

            await foodRepository.delete({
                id: Number(id)
            })

            return response.json({
                status: "success",
                message: "Food successfully added",
                food
            })
        }
    }
    
