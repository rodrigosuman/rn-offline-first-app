import { Router } from "express";
import syncRouter from "./syncApp.routes";
import todosRouter from "./todos.routes";
import todosTasksRouter from "./todosTasks.routes";

const routes = Router();

routes.use("/todos", todosRouter);
routes.use("/tasks", todosTasksRouter);
routes.use("/sync", syncRouter);

export default routes;
