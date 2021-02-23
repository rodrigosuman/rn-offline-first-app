import TodosTasksRepository from "../../repositories/TodosTasksRepository";

import TodosTasks from "../../models/TodosTasks";

import { getCustomRepository } from "typeorm";
import Todos from "../../models/Todos";

interface RequestDTO {
  title: string;
  todo?: Todos;
}

class CreateTodoTaskService {
  async execute({ title, todo, ...rest }: RequestDTO): Promise<TodosTasks> {
    const todosTasksRepository = getCustomRepository(TodosTasksRepository);

    const todoTask = todosTasksRepository.create({
      ...rest,
      title,
      todo,
    });

    await todosTasksRepository.save(todoTask, {});

    return todoTask;
  }
}

export default CreateTodoTaskService;
