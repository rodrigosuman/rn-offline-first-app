import { getCustomRepository } from "typeorm";
import Todos from "../../models/Todos";
import TodosRepository from "../../repositories/TodosRepository";

interface RequestDTO {
  title?: string;
  observation?: string;
  checked?: boolean;
  lastPulledAt?: Date;
}

class UpdateTodoService {
  async execute(todoId: string, data: RequestDTO): Promise<Todos | undefined> {
    const todosRepository = getCustomRepository(TodosRepository);

    await todosRepository.update(todoId, data);

    return await todosRepository.findOne(todoId);
  }
}

export default UpdateTodoService;
