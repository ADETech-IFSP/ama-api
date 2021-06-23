import express = require('express');
import { router } from './routers';

const app = express();

app.use(router);
app.use(express.json());

export { app }