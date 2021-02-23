import TodosTasksRepository from "../../repositories/TodosTasksRepository";
import TodosTasks from "../../models/TodosTasks";

import { getCustomRepository, IsNull } from "typeorm";

class ListTodoTasksService {
  execute(): Promise<Array<TodosTasks>> {
    const todosTasksRepository = getCustomRepository(TodosTasksRepository);

    return todosTasksRepository.find({
      loadRelationIds: true,
    });
  }
}

export default ListTodoTasksService;
