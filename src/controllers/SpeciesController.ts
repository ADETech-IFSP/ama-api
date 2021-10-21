import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SpeciesRepository } from "../repository/SpeciesRepository";

export class SpeciesController {

    async create(request: Request, response: Response) {
        let {
            name
        } = request.body;

        const speciesRepository = getCustomRepository(SpeciesRepository);

        const SpeciesAlreadyExist = await speciesRepository.findOne({
            name
        });

        if (SpeciesAlreadyExist) {
            return response.json({
                status: "error",
                message: "species has not found"
            }).status(503)
        }

        const species = speciesRepository.create({
            name
        });

        await speciesRepository.save(species)

        return response.json({
            status: "sucess",
            message: "Species successfully created ",
            species
        }).status(201);
    }
    
    async read(request: Request, response: Response) {

        const speciesRepository = getCustomRepository(SpeciesRepository);
        const species = await speciesRepository.find()

        if (!species) {
            return response.json({
                status: "error",
                message: "Species has not found"
            }).status(404);
        }
        return response.json({
            status: "sucess",
            message: "Species successfully added",
            species
        }).status(200);
    }

    async delete(request : Request, response: Response){
        const {
            id
        } = request.params;

        const speciesRepository = getCustomRepository(SpeciesRepository);
        const species = await speciesRepository.findOne({
            id : Number(id)
        });

        if (!species) {
            return response.json({
                status : "error",
                message : "Species has not found"
            }).status(404); 
        }
        await speciesRepository.delete({
            id : Number (id)
        })
        return response.json({
            status : "success",
            message : "Species successfully deleted",
            species
        })
    }
}