import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repository/UserRepository";
import bcrypt = require('bcrypt');

export class UserController{

    async create(request: Request, response: Response){
        let { 
            name, 
            last_name, 
            birth_date, 
            email, 
            telephone,
            password,
            photo_url,
            gender
        } = request.body;

        const userRepository = getCustomRepository(UserRepository);

        const userAlreadyExists = await userRepository.findOne({
            email,
            telephone
        });

        if(userAlreadyExists){
            return response.json({
                status: "error",
                message: "Usuário já cadastrado."
            }).status(503);
        }

        const confirm_code =  Math.floor(Math.random()*16777215).toString(16);
        const verified = false;
        const user_type = 0;

        password = await bcrypt.hash(password, 12);

        const user = userRepository.create({
            name, 
            last_name, 
            birth_date, 
            email, 
            telephone,
            password,
            photo_url,
            confirm_code,
            verified,
            gender,
            user_type
        });

        await userRepository.save(user);

        return response.json({
            status: "success",
            message: "Usuário cadastrado com sucesso!"
        }).status(201);

    }

}