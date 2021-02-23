import { DeleteResult, getCustomRepository } from "typeorm";
import Todos from "../../models/Todos";
import TodosRepository from "../../repositories/TodosRepository";

interface RequestDTO {
  todoId: string;
}

class DeleteTodoService {
  async execute({ todoId }: RequestDTO): Promise<void> {
    const todosRepository = getCustomRepository(TodosRepository);

    await todosRepository.delete(todoId);
  }
}

export default DeleteTodoService;
