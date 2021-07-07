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