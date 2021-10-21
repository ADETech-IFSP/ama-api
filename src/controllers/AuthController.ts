import { Request, Response } from "express";
import { isLoggedIn, validateLogin } from "../services/Auth";

class AuthController {

    async doLogin(request: Request, response: Response) {
        const { email, password } = request.body;
        const token = await validateLogin(email, password);

        if (!token) {
            return response.status(500).json({
                status: "error",
                message: "Verifique os dados de acesso!"
            })
        }

        return response.status(200).json({
            status: "success",
            message: "Logado com sucesso!",
            token
        })
    }

    async validate(request: Request, response: Response) {
        const { token } = request.body;
        const user = await isLoggedIn(token);

        if (!user) {
            return response.status(500).json({
                status: "error",
                message: "Sessão expirada!"
            });
        }

        delete user.password;
        delete user.confirm_code;

        return response.status(200).json({
            status: "success",
            message: "Autenticado com sucesso!",
            user
        })
    }

}

export { AuthController };