import { request, Router } from "express";
import TodosRepository from "../repositories/TodosRepository";
import CreateTodoService from "../services/todos/CreateTodoService";
import DeleteTodoService from "../services/todos/DeleteTodoService";
import UpdateTodoService from "../services/todos/UpdateTodoService";
import ListTodoService from "../services/todos/ListTodoService";
import { parseISO } from "date-fns";
import { clearUndefinedValues } from "../utils/clearUndefinedValues";
import ListTodoTasksService from "../services/todosTasks/ListTodoTasksService";
import CreateTodoTaskService from "../services/todosTasks/CreateTodoTasksService";
import DeleteTodoTasksService from "../services/todosTasks/DeleteTodoTasksService";
import { getCustomRepository } from "typeorm";

const todosTasksRouter = Router();

todosTasksRouter.get("/", async (request, response) => {
  const listTodoTaskService = new ListTodoTasksService();
  try {
    const todoTasks = await listTodoTaskService.execute();
    return response.json(todoTasks);
  } catch (error) {
    return response.status(400).send(error);
  }
});

todosTasksRouter.post("/", async (request, response) => {
  try {
    const { title, todoId, ...rest } = request.body;

    const todosRepository = getCustomRepository(TodosRepository);

    const createTodoTaskService = new CreateTodoTaskService();

    const todo = await todosRepository.findOne(todoId);

    // if (!todo) throw Error("Todo was not found");

    const todoTask = await createTodoTaskService.execute({
      ...rest,
      title,
      todo,
    });

    return response.json(todoTask);
  } catch (err) {
    return response.status(400).json(err);
  }
});

todosTasksRouter.delete("/:todoId", async (request, response) => {
  try {
    const { todoId } = request.params;

    const deleteTodoTaskService = new DeleteTodoTasksService();

    await deleteTodoTaskService.execute({ todoId });

    return response.status(204).send();
  } catch (err) {
    return response.status(400).json(err);
  }
});

export default todosTasksRouter;
