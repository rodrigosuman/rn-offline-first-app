import {
  field,
  date,
  readonly,
  action,
  lazy,
  children
} from '@nozbe/watermelondb/decorators'
import { ModelBase } from './base/ModelBase'
import { Model, Q } from '@nozbe/watermelondb'
import TodosTasks from './TodosTasks'
import { v4 } from 'react-native-uuid'

export default class Todos extends ModelBase {
  static table = 'todos'

  static associations = {
    todos_tasks: { type: 'has_many', foreignKey: 'todo_id' }
  }

  @field('title') title

  @field('server_id') serverId

  @field('observation') observation

  @field('checked') checked

  @readonly @date('created_at') createdAt
  @readonly @date('updated_at') updatedAt

  @field('last_pulled_at') lastPulledAt

  @children('todos_tasks') tasks

  @action async toggleChecked() {
    await this.update(todo => (todo.checked = !this.checked))
  }

  @action async addTask() {
    const todoTasksCollection = this.collections.get<TodosTasks>('todos_tasks')

    await this.update(todo => (todo.checked = false))

    return await todoTasksCollection.create((task: TodosTasks) => {
      task._raw.id = v4()
      task.title = `Task ${Date.now()}`
      task.todoId.set(this)
    })
  }

  @action async deleteRecord() {
    await this.tasks.destroyAllPermanently()

    await super.markAsDeleted()
  }
}
