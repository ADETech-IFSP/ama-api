import express = require('express');
import 'reflect-metadata';
import { getCustomRepository } from 'typeorm';
import createConnection from './database';
import { BreedRepository } from './repository/BreedRepository';
import { SpeciesRepository } from './repository/SpeciesRepository';
import { router } from './routers';
import { Feeder } from './services/Feeeder';
var cors = require('cors') 

createConnection().then(conn => {
    //const breedRepository = getCustomRepository(BreedRepository);
    //const specieRepository = getCustomRepository(SpeciesRepository);

    //Feeder(breedRepository, specieRepository);

});
const app = express();

app.use(cors()) // VERIFICAR NO IONIC 
app.use(express.json());
app.use(router);

export { app }