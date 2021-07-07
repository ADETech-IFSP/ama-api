import sendgrid = require('@sendgrid/mail');
import { User } from '../entity/UserModel';
var twilio = require('twilio');


const accountSid = "ACf04c7c952fc9558c0e6be0c1c5858f96";
const authToken = "bf060a1bc57f5b167fc53852ec895af9";
const twilioNumber = "+1 864 651 1976";

const client = new twilio(accountSid, authToken);


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

export const sendMessage = (message: string, phone: string) => {
    client.messages
    .create({
      from: twilioNumber,
      to: phone,
      body: message,
    })
    .then((message) => {
        
    });
}

export const sendConfirmCode = (code: string, phone: string) => {
    sendMessage(`O seu código de confirmação é ${code}`, phone);
}


export { sendEmailCode }