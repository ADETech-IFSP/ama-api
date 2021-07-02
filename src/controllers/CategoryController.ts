import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { CategoryRepository } from "../repository/CategoryRepository";


export class CategoryController {
    async create (request : Request,response : Response){
        let {
        name,
        description

    } = request.body;

    const categoryRepository = getCustomRepository(CategoryRepository);

    const CategoryAlreadyExist = await categoryRepository.findOne({
        name
    });
    
    if (CategoryAlreadyExist){
        return response.json({
            status : "error",
            message : "categoria ja criada"
        }).status(503)
    }

    const category = categoryRepository.create({
        
        name,
        description
    });

    await categoryRepository.save(category)

    return response.json({
        status : "sucess",
        message : "categoria criada",
        category
    }).status(201);
}
}