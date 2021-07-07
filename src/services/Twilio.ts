const Twilio = require('twilio');

const accountSid = "ACf04c7c952fc9558c0e6be0c1c5858f96";
const authToken = "10e056765230a3fced74ceaefedaf04f";
const twilioNumber = "+18646511976";

const client = new Twilio(accountSid, authToken);

export const sendMessage = (message: string, phone: string) => {
    client.messages
    .create({
      from: twilioNumber,
      to: phone,
      body: message,
    })
    .then((message) => {
        console.log(message)
    });
}

export const sendConfirmCode = (code: string, phone: string) => {
    sendMessage(`O seu código de confirmação é ${code}`, phone);
}