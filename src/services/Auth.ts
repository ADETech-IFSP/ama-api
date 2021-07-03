import { getCustomRepository } from "typeorm";
import { AuthRepository } from "../repository/AuthRepository";
import { UserRepository } from "../repository/UserRepository";

const bcrypt = require('bcrypt');

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
        token
    })

    if(!auth){
        return null;
    }

    return userRepository.getUser(auth.user_id);
}

export const validateLogin = async (email : string, password : string) => {
    const userRepository =  getCustomRepository(UserRepository);
    const authRepository = getCustomRepository(AuthRepository);
    const user = await userRepository.getUserByEmail(email);

    if(!user){
        return null;
    }

    if(bcrypt.compare(password, user.password)){
        const token = generateToken();
        const auth = authRepository.create({
            user_id: user.id,
            token,
            created_date: new Date()
        })

        await authRepository.save(auth);

        return token;
    }

    return null;

}   
