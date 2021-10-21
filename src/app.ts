import express = require('express');
import 'reflect-metadata';
import createConnection from './database';
import { router } from './routers';
var cors = require('cors') 

createConnection();
const app = express();

app.use(cors()) // VERIFICAR NO IONIC 
app.use(express.json());
app.use(router);

export { app }