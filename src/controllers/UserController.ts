import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repository/UserRepository";
import bcrypt = require('bcrypt');
import { isLoggedIn } from "../services/Auth";
import { uploadImage } from "../services/Cloudnary";
import { sendEmailCode } from "../services/Twilio";

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

        sendEmailCode(user);

        return response.json({
            status: "success",
            message: "Usuário cadastrado com sucesso!"
        }).status(201);

    }

    async read(request: Request, response: Response){
        const {
            id
        } = request.params;

        const userRepository = getCustomRepository(UserRepository);
        const user = await userRepository.findOne({
            id: Number(id)
        })

        if(!user){
            return response.json({
                status: "error",
                message: "Usuário não encontrado."
            }).status(404);
        }

        delete user.password;

        return response.json({
            status: "success",
            message: "Usuário encontrado com sucesso!",
            user
        }).status(200);
    }

    async update(request: Request, response: Response){
        
    }

    async delete(request: Request, response: Response){
        const {
            id
        } = request.params;

        const userRepository = getCustomRepository(UserRepository);
        const user = await userRepository.findOne({
            id: Number(id)
        });
        
        if(!user){
            return response.json({
                status: "error",
                message: "Usuário não encontrado."
            }).status(404);
        }

        delete user.password;

        await userRepository.delete({
            id: Number(id)
        })

        return response.json({
            status: "success",
            message: "Usuário deletado com sucesso!",
            user
        })

    }

    async uploadProfilePhoto(request: Request, response: Response){
        const {
            image,
            token
        } = request.body;

        const userRepository = getCustomRepository(UserRepository);
        const user = await isLoggedIn(token);

        if(!user){
            return response.json({
                status: "error",
                message: "User is not logged in."
            }).status(403);
        }

        user.photo_url = await uploadImage(image);
        await userRepository.update(user.id, user);

        return response.json({
            status: "success",
            message: "The photo has been uploaded.",
            photo: user.photo_url
        }).status(201)
    }

    async validateUser(request: Request, response: Response){
        const {
            email
        } = request.body;
        
        const userRepository = getCustomRepository(UserRepository);

        const user = await userRepository.findOne({
            email
        })

        if(user){
            return response.json({
                status: "error",
                message: "User already exists."
            }).status(403)
        }

        return response.json({
            status: "success",
            message: "User is not registered."
        }).status(200)

    }

}