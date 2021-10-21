import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { BreedRepository } from "../repository/BreedRepository";
import { isLoggedIn } from "../services/Auth";

export class BreedController {

    async create(request: Request, response: Response) {
        let {
            name
        } = request.body;

        const breedRepository = getCustomRepository(BreedRepository);

        const BreedAlreadyExist = await breedRepository.findOne({
            name
        });

        if (BreedAlreadyExist) {
            return response.json({
                status: "error",
                message: "breed has not found"
            }).status(503)
        }

        const breed = breedRepository.create({
            name
        });

        await breedRepository.save(breed)

        return response.json({
            status: "success",
            message: "Breed successfully created",
            breed
        }).status(201);
    }
    
    async read(request: Request, response: Response) {
        const {
            id
        } = request.params;        
        const breedRepository = getCustomRepository(BreedRepository);

        const breeds = await breedRepository.find({
            where:{
                species_id: Number(id)
            }
        })

        if (!breeds) {
            return response.json({
                status: "error",
                message: "Breed has not found"
            }).status(404);
        }
        return response.json({
            status: "success",
            message: "Breeds successfully added",
            breeds
        }).status(200);
    }

    async delete(request : Request, response: Response){
        const {
            id
        } = request.params;

        const breedRepository = getCustomRepository(BreedRepository);
        const breed = await breedRepository.findOne({
            id : Number(id)
        });

        if (!breed) {
            return response.json({
                status : "error",
                message : "Breed has not found"
            }).status(404); 
        }
        await breedRepository.delete({
            id : Number (id)
        })
        return response.json({
            status : "success",
            message : "Breed successfully",
            breed
        })
    }
}

    

