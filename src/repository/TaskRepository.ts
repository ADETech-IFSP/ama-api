import { EntityRepository, Repository } from "typeorm";
import { Task } from "../entity/TaskModel";

@EntityRepository(Task)
class TaskRepository extends Repository<Task> {

}

export {TaskRepository};