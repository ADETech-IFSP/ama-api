import { Breed } from "../entity/BreedModel";
import { BreedRepository } from "../repository/BreedRepository";
import { SpeciesRepository } from "../repository/SpeciesRepository";

const fs = require('fs')

export function Feeder(breedRepository : BreedRepository, specieRepository: SpeciesRepository){
    try {
        const data = fs.readFileSync('./src/services/SpeciesBreed.csv', 'utf8')
        const lines = data.split('\n')
        const species = lines.shift().split(';')
        var breeds : Breed[] = [];

        species.map(async (specie, index) => {
            var temp = specieRepository.create({
                name: specie,
                description: ""
            })

            await specieRepository.save(temp);

            lines.map(line => {
                line = line.split(';')
                var breed = breedRepository.create({
                    name: line[index],
                    specie: temp,
                    description: ""
                })
                
                breeds.push(breed);

            })

            if(index == species.length - 1){
                breeds.map(async breed => {
                    await breedRepository.save(breed)
                })
            }

        })
    } catch (err) {
        console.log(err)
    }
}