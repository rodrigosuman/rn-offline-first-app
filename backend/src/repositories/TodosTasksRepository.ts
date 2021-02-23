import TodosTasks from "../models/TodosTasks";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(TodosTasks)
class TodosTasksRepository extends Repository<TodosTasks> {}

export default TodosTasksRepository;
