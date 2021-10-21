import sendgrid = require('@sendgrid/mail');
import { User } from '../entity/UserModel';

sendgrid.setApiKey("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")

const sendEmailCode = (user: User) => {

    const msg = {
        to: user.email,
        from: "noreply@amemais.tech",
        subject: "Confirme sua conta!",
        text: `Olá ${user.name}! Este é o seu código de confirmação:`,
        html: `Olá ${user.name}! Este é o seu código de confirmação: ${user.confirm_code}`
    }

    sendgrid.send(msg);    
    
}


export { sendEmailCode }