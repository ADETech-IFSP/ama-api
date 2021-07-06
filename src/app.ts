import cors = require('cors');
import express = require('express');
import 'reflect-metadata';
import createConnection from './database';
import { router } from './routers';

createConnection();
const app = express();

app.use((req, res, next) => {	
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", '*');
    app.use(cors());
    next();
});

app.use(express.json());
app.use(router);

export { app }

