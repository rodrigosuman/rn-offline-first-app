import Todos from "../../models/Todos";
import TodosRepository from "../../repositories/TodosRepository";

import { getCustomRepository, IsNull } from "typeorm";

class ListTodoService {
  execute(): Promise<Array<Todos>> {
    const todosRepository = getCustomRepository(TodosRepository);

    return todosRepository.find({
      where: {
        deletedAt: IsNull(),
      },
    });
  }
}

export default ListTodoService;
