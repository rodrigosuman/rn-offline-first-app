import { request, Router } from "express";
import TodosRepository from "../repositories/TodosRepository";
import CreateTodoService from "../services/todos/CreateTodoService";
import DeleteTodoService from "../services/todos/DeleteTodoService";
import UpdateTodoService from "../services/todos/UpdateTodoService";
import ListTodoService from "../services/todos/ListTodoService";
import { parseISO } from "date-fns";
import { clearUndefinedValues } from "../utils/clearUndefinedValues";

const todosRouter = Router();

todosRouter.get("/", async (request, response) => {
  const listTodoService = new ListTodoService();
  try {
    const todos = await listTodoService.execute();
    return response.json(todos);
  } catch (error) {
    return response.status(400).send(error);
  }
});

todosRouter.post("/", async (request, response) => {
  try {
    const { title, observation } = request.body;

    const createTodoService = new CreateTodoService();

    const todo = await createTodoService.execute({
      title,
      observation,
    });

    return response.json(todo);
  } catch (err) {
    return response.status(400).json(err);
  }
});

todosRouter.delete("/:todoId", async (request, response) => {
  try {
    const { todoId } = request.params;

    const deleteTodoService = new DeleteTodoService();

    await deleteTodoService.execute({ todoId });

    return response.status(204).send();
  } catch (err) {
    return response.status(400).json(err);
  }
});

todosRouter.put("/:todoId", async (request, response) => {
  try {
    const { todoId } = request.params;
    const { title, observation, checked, lastPulledAt } = request.body;

    const updateTodoService = new UpdateTodoService();

    const parsedLastPulledAt = lastPulledAt && parseISO(lastPulledAt);

    const updatedTodo = await updateTodoService.execute(
      todoId,
      clearUndefinedValues({
        title,
        observation,
        checked,
        lastPulledAt: parsedLastPulledAt,
      }),
    );

    return response.json(updatedTodo);
  } catch (err) {
    return response.status(400).json(err);
  }
});

export default todosRouter;
