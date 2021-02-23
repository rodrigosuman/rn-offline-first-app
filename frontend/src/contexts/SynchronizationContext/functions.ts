import Todos from '../../watermelon/models/Todos'
import TodosTasks from '../../watermelon/models/TodosTasks'

interface IArgs<T> {
  created: Array<T>
  updated: Array<T>
  deleted: Array<string>
}

interface IDataRaw<T> {
  created?: Array<T>
  updated?: Array<T>
  deleted?: Array<string>
}

interface ITodoTasksArgs extends TodosTasks {
  todo: Todos
  todo_id: string
}

export const mountTodoObject = (args: IArgs<Todos>): IDataRaw<Todos> => {
  const created = args.created.map((item: Todos): Todos => item)

  const updated = args.updated.map(
    (item: Todos): Todos => {
      return item
    }
  )

  const deleted = args.deleted

  return {
    created,
    updated,
    deleted
  }
}

export const mountTodoTasksObject = (
  args: IArgs<ITodoTasksArgs>
): IDataRaw<TodosTasks> => {
  const created = args.created.map(
    (item: ITodoTasksArgs): ITodoTasksArgs => {
      item.todo_id = item.todo.id
      return item
    }
  )

  const updated = args.updated.map(
    (item: TodosTasks): TodosTasks => {
      return item
    }
  )

  const deleted = args.deleted

  return {
    created,
    updated,
    deleted
  }
}
