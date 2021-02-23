import Todos from "../models/Todos";
import {
  EntityRepository,
  Repository,
  In,
  FindConditions,
  DeleteResult,
  getCustomRepository,
} from "typeorm";

@EntityRepository(Todos)
class TodosRepository extends Repository<Todos> {
  async delete(criteria: string | Array<string>): Promise<DeleteResult> {
    const todosRepository = getCustomRepository(TodosRepository);

    await todosRepository.update(criteria, {
      deletedAt: new Date(),
    });

    return {
      raw: [criteria],
    };
  }

  async deleteMany(ids: Array<string>) {
    const todosRepository = getCustomRepository(TodosRepository);

    await todosRepository
      .createQueryBuilder()
      .update(Todos)
      .set({
        deletedAt: new Date(),
      })
      .where({
        id: In(ids),
      })
      .execute();
  }
}

export default TodosRepository;
