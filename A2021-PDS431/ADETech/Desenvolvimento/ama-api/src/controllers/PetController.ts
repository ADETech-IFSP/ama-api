import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { PetRepository } from "../repository/PetRepository";
import { isLoggedIn } from "../services/Auth";

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
            message: "Pet add successfully!", 
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
                message: "Pet has not found."
            }).status(404);
        }
        
        return response.json({
            status: "success",
            message: "Pet deleted successfully!",
            pet
        }).status(200);
    }

    async update(request: Request, response: Response){
        const {
            name,
            breed,
            birth_date,
            gender,
            photo_url,
            description,
            category_id,
            owner_id,
            token
        } = request.body;

        let id = Number(request.params.id);

        const pet = await isLoggedIn(token);

        if(!pet){
            return response.status(500).json({
                status:"error",
                message:"Session expired!"
            });
        }

        const petRepository = getCustomRepository (PetRepository);
        const updatedPet = {
            name,
            breed,
            birth_date,
            gender,
            photo_url,
            description,
            category_id,
            owner_id,
            id
        }
        await petRepository.update(id, updatedPet);

        return response.status(201).json({
            status:"success",
            message: "Pet has updated with success",
            pet
        })

    }

    async delete(request: Request, response: Response){
        const{
            id
        } = request.params;

        const petRepository = getCustomRepository(PetRepository);
        const pet = await petRepository.findOne({
            id: Number(id)
        });

        if(!pet){
            return response.json({
                status: "error",
                message: "Pet has not found."
            }).status(404);
        }

        await petRepository.delete({
            id: Number(id)
        })

        return response.json({
            status: "success",
            message: "Pet deleted successfully!",
            pet
        })

    }

}