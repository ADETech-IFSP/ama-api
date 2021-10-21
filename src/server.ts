import { app } from './app';
import { User } from './entity/UserModel';
import { sendEmail, sendEmailCode } from './services/Email';

app.listen(process.env.PORT || 8080, ()=> console.log("[HTTP] => Server is running!"));