import { app } from './app';

app.listen(process.env.PORT || 80, ()=> console.log("Server is running!"));