import Todos from "../../models/Todos";
import TodosRepository from "../../repositories/TodosRepository";

import { getCustomRepository } from "typeorm";

interface RequestDTO {
  title: string;
  observation: string;
}

class CreateTodoService {
  async execute({ title, observation }: RequestDTO): Promise<Todos> {
    const todosRepository = getCustomRepository(TodosRepository);

    const todo = todosRepository.create({
      title,
      observation,
    });

    await todosRepository.save(todo, {});

    return todo;
  }
}

export default CreateTodoService;
