import { getCustomRepository } from "typeorm";
import { AuthRepository } from "../repository/AuthRepository";
import { UserRepository } from "../repository/UserRepository";

import bcrypt = require('bcrypt');

var rand = function() {
    return Math.random().toString(36).substr(2);
};

function generateToken() {
    return rand() + rand();
};

export const isLoggedIn = async (token: string) => {
    const userRepository =  getCustomRepository(UserRepository);
    const authRepository = getCustomRepository(AuthRepository);

    const auth = await authRepository.findOne({
        where:{
            token
        },
        relations: ['user']
    })

    if(!auth){
        return null;
    }

    return auth.user;
}

export const validateLogin = async (email : string, password : string) => {
    const userRepository =  getCustomRepository(UserRepository);
    const authRepository = getCustomRepository(AuthRepository);
    const user = await userRepository.getUserByEmail(email);

    if(!user){
        return null;
    }
    const isValidPassword = await bcrypt.compare(password, user.password);

    if(isValidPassword){
        const token = generateToken();
        const auth = authRepository.create({
            user,
            token,
            created_date: new Date()
        })

        await authRepository.save(auth);

        return token;
    }

    return null;

}   
