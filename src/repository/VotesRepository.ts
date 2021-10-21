import { Entity, EntityRepository, Repository } from "typeorm";
import { Votes } from "../entity/VotesModel";

@EntityRepository(Votes)
class VotesRepository extends Repository<Votes> {

}

export {VotesRepository};