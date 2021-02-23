import {
  getCustomRepository,
  Not,
  IsNull,
  MoreThanOrEqual,
  LessThanOrEqual,
  LessThan,
  In,
  MoreThan,
  FindOneOptions,
} from "typeorm";
import Todos from "../../models/Todos";
import TodosTasks from "../../models/TodosTasks";
import TodosRepository from "../../repositories/TodosRepository";
import TodosTasksRepository from "../../repositories/TodosTasksRepository";

interface IDataRaw<T> {
  [model: string]: {
    created?: Array<T>;
    updated?: Array<T>;
    deleted?: Array<string>;
  };
}

interface IResponseDataRaw {
  [model: string]: {
    created?: Array<any>;
    updated?: Array<any>;
    deleted?: Array<string>;
  };
}

interface RequestDTO {
  lastPulledAt: Date;
  timestamp: number;
}

interface ResponseDTO {
  changes: IResponseDataRaw;
  timestamp: number;
}

class PullChangesService {
  private async _todosTasksSync({
    lastPulledAt,
    timestamp,
  }: RequestDTO): Promise<IDataRaw<TodosTasks>> {
    const todosTasksRepository = getCustomRepository(TodosTasksRepository);

    const created = await todosTasksRepository.find({
      select: ["todo", "id", "lastPulledAt", "title"],
      relations: ["todo"],
      where: {
        lastPulledAt: IsNull(),
        deletedAt: IsNull(),
      },
    });

    const deleted = (
      await todosTasksRepository.find({
        select: ["id"],
        where: {
          deletedAt: MoreThanOrEqual(lastPulledAt),
          lastPulledAt: LessThanOrEqual(lastPulledAt),
        },
      })
    ).map(item => item.id);

    await todosTasksRepository
      .createQueryBuilder()
      .update(TodosTasks)
      .set({
        lastPulledAt: new Date(timestamp),
        updatedAt: new Date(timestamp),
      })
      .where({
        id: In(
          [...created, ...deleted.map(id => ({ id }))].map(item => item.id),
        ),
      })
      .execute();

    return {
      todos_tasks: {
        created,
        deleted,
        updated: [],
      },
    };
  }

  private async _todosSync({
    lastPulledAt,
    timestamp,
  }: RequestDTO): Promise<IDataRaw<Todos>> {
    const todosRepository = getCustomRepository(TodosRepository);
    const todosTasksRepository = getCustomRepository(TodosTasksRepository);

    const { select } = {
      select: ["checked", "id", "lastPulledAt", "observation", "title"],
    } as FindOneOptions<Todos>;

    const created = await todosRepository.find({
      select,
      where: {
        lastPulledAt: IsNull(),
        deletedAt: IsNull(),
      },
    });

    const updated = await todosRepository.find({
      select,
      where: {
        updatedAt: MoreThanOrEqual(lastPulledAt),
        deletedAt: IsNull(),
        lastPulledAt: LessThan(lastPulledAt),
      },
    });

    const deleted = (
      await todosRepository.find({
        select: ["id"],
        where: {
          deletedAt: MoreThanOrEqual(lastPulledAt),
          lastPulledAt: LessThanOrEqual(lastPulledAt),
        },
      })
    ).map(item => item.id);

    await todosRepository
      .createQueryBuilder()
      .update(Todos)
      .set({
        lastPulledAt: new Date(timestamp),
        updatedAt: new Date(timestamp),
      })
      .where({
        id: In(
          [...created, ...updated, ...deleted.map(id => ({ id }))].map(
            item => item?.id,
          ),
        ),
      })
      .execute();

    await todosTasksRepository
      .createQueryBuilder()
      .update(TodosTasks)
      .set({
        lastPulledAt: new Date(timestamp),
        deletedAt: new Date(timestamp),
      })
      .where({
        todo: In(deleted.map(id => id)),
      })
      .execute();

    return {
      todos: {
        created,
        deleted,
        updated,
      },
    };
  }

  async execute({ lastPulledAt, timestamp }: RequestDTO): Promise<ResponseDTO> {
    const todos = await this._todosSync({ lastPulledAt, timestamp });
    const todos_tasks = await this._todosTasksSync({ lastPulledAt, timestamp });

    return {
      changes: {
        ...todos,
        ...todos_tasks,
      },
      timestamp,
    };
  }
}

export default PullChangesService;
