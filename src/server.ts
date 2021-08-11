import { app } from './app';
import { User } from './entity/UserModel';
import { sendEmail, sendEmailCode } from './services/Email';

//sendEmail("devadryan@gmail.com", `Servidor iniciado com sucesso na porta ${process.env.PORT || 80}`, "Server Status");
sendEmailCode({
    name: "Adryan Alencar",
    email: "devadryan@gmail.com",
    confirm_code: "6DF7F2"
} as User)


app.listen(process.env.PORT || 80, ()=> console.log("Server is running!"));