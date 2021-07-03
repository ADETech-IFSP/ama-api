import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { PetRepository } from "../repository/PetRepository";

export class PetController{

    async create (request: Request, response: Response){
        let{
            name,
            breed,
            birth_date,
            gender,
            photo_url,
            description,
            category_id,
            owner_id,
        } = request.body

        const petRepository = getCustomRepository(PetRepository);

        const pet = petRepository.create({
            name,
            breed,
            birth_date,
            gender,
            photo_url,
            description,
            category_id,
            owner_id,
        });
        await petRepository.save(pet);

        return response.json({
            status: "success",
            message: "Pet cadastrado com sucesso!", 
            pet

        }).status(201)
    }

    async read(request: Request, response: Response){
        const{
            id
        } = request.params;

        const petRepository = getCustomRepository(PetRepository);
        const pet = await petRepository.findOne({
            id: Number(id)
        })

        if(!pet){
            return response.json({
                status: "error",
                message: "Pet não encontrado."
            }).status(404);
        }
        
        return response.json({
            status: "success",
            message: "Pet deletado com sucesso!",
            pet
        }).status(200);
    }

    async update(request: Request, response: Response){
  
    }

    async delete(request: Request, response: Response){
        const{
            id
        } = request.params;
    }

}