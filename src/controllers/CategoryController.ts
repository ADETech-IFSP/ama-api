import { Request, response, Response } from "express";
import { getCustomRepository } from "typeorm";
import { Category } from "../entity/CategoryModel";
import { CategoryRepository } from "../repository/CategoryRepository";
import { isLoggedIn } from "../services/Auth";


export class CategoryController {
    async create(request: Request, response: Response) {
        let {
            name,
            description

        } = request.body;

        const categoryRepository = getCustomRepository(CategoryRepository);

        const CategoryAlreadyExist = await categoryRepository.findOne({
            name
        });

        if (CategoryAlreadyExist) {
            return response.json({
                status: "error",
                message: "categoria has not found"
            }).status(503)
        }

        const category = categoryRepository.create({

            name,
            description
        });

        await categoryRepository.save(category)

        return response.json({
            status: "sucess",
            message: "Category successfully created ",
            category
        }).status(201);
    }

    async read(request: Request, response: Response) {
        const {
            id
        } = request.params;

        const categoryRepository = getCustomRepository(CategoryRepository);
        const category = await categoryRepository.findOne({
            id: Number(id)
        })

        if (!category) {
            return response.json({
                status: "error",
                message: "Category has not found"
            }).status(404);
        }
        return response.json({
            status: "sucess",
            message: "Category successfully added",
            category
        }).status(200);
    }
    async update(request: Request, response: Response) {
        const {
            name,
            description,
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

        const categoryRepository = getCustomRepository(CategoryRepository);
        const updateCategory = {
            name,
            description,
            id
        }

        await categoryRepository.update(id, updateCategory);

        return response.status(201).json({
            status: "success",
            message: "Category successfully updated"
        })
    }

    async delete(request: Request, response: Response) {
        const {
            id
        } = request.params;

        const categoryRepository = getCustomRepository(CategoryRepository);
        const category = await categoryRepository.findOne({
            id: Number(id)
        });

        if (!category) {
            return response.json({
                status: "error",
                message: "Category has not found"
            }).status(404);
        }

        await categoryRepository.delete({
            id: Number(id)
        })

        return response.json({
            status: "success",
            message: "Category successfully deleted",
            category
        })

    }
}