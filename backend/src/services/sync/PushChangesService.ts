import {
  getCustomRepository,
  Not,
  IsNull,
  MoreThanOrEqual,
  LessThanOrEqual,
  LessThan,
  In,
  MoreThan,
} from "typeorm";
import Todos from "../../models/Todos";
import TodosTasks from "../../models/TodosTasks";
import TodosRepository from "../../repositories/TodosRepository";
import TodosTasksRepository from "../../repositories/TodosTasksRepository";

interface ITodoRaw extends Todos {
  _changed: string;
}

interface ITodoTasksRaw extends TodosTasks {
  _changed: string;
  todo_id: string;
}

interface IDataRaw<T> {
  created: Array<T>;
  updated: Array<T>;
  deleted: Array<string>;
  lastPulledAt: Date;
}

interface IRequestDataRaw {
  [model: string]: {
    created: Array<any>;
    updated: Array<any>;
    deleted: Array<string>;
  };
}

interface RequestDTO {
  lastPulledAt: Date;
  changes: IRequestDataRaw;
}

interface ResponseDTO {}

class PushChangesService {
  private async _syncTodos({
    lastPulledAt,
    ...changes
  }: IDataRaw<ITodoRaw>): Promise<any> {
    const todosRepository = getCustomRepository(TodosRepository);

    const { created, deleted, updated } = changes;

    return await Promise.all([
      await Promise.all(
        updated.map(todo => {
          const mountUpdateData = (columns: Array<string>) => {
            let data = {} as any;

            columns.map((column: string) => {
              data[column] = todo[column];
            });

            return { ...data, lastPulledAt };
          };

          const excludedColumns = [
            "updated_at",
            "created_at",
            "last_pulled_at",
            "id",
          ];

          const updatedColumns = todo._changed
            .split(",")
            .filter(item => !excludedColumns.includes(item));

          const data = mountUpdateData(updatedColumns);

          return todosRepository.update(todo.id, data);
        }),
      ),
      await todosRepository.deleteMany(deleted),
      await Promise.all(
        created.map(async ({ checked, id, title, observation }) => {
          const newTodo = todosRepository.create({
            checked,
            id,
            lastPulledAt,
            title,
            observation,
          });

          return await todosRepository.save(newTodo, {});
        }),
      ),
    ]);
  }

  private async _syncTodosTasks({
    lastPulledAt,
    ...changes
  }: IDataRaw<ITodoTasksRaw>): Promise<any> {
    const todosTasksRepository = getCustomRepository(TodosTasksRepository);

    const { created, deleted, updated } = changes;

    return await Promise.all([
      await Promise.all(
        created.map(async ({ id, title, todo_id }) => {
          const task = todosTasksRepository.create({
            id,
            title,
            todo: {
              id: todo_id,
            },
            lastPulledAt,
          });

          return await todosTasksRepository.save(task);
        }),
      ),
    ]);
  }

  async execute({ lastPulledAt, changes }: RequestDTO): Promise<ResponseDTO> {
    try {
      const todos = await Promise.all(
        await this._syncTodos({ lastPulledAt, ...changes.todos }),
      );
      const response = await Promise.all([
        await this._syncTodosTasks({ lastPulledAt, ...changes.todos_tasks }),
      ]);

      return { ...response, ...todos };
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default PushChangesService;
