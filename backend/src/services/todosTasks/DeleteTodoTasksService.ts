import { getCustomRepository } from "typeorm";
import TodosTasksRepository from "../../repositories/TodosTasksRepository";

interface RequestDTO {
  todoId: string;
}

class DeleteTodoTasksService {
  async execute({ todoId }: RequestDTO): Promise<void> {
    const todosRepository = getCustomRepository(TodosTasksRepository);

    await todosRepository.delete(todoId);
  }
}

export default DeleteTodoTasksService;
