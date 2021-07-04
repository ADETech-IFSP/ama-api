import express = require('express');
import 'reflect-metadata';
import createConnection from './database';
import { router } from './routers';

createConnection();
const app = express();

app.use(express.json());
app.use(router);

export { app }