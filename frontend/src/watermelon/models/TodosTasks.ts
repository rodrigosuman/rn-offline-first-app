import { field, date, readonly, relation } from '@nozbe/watermelondb/decorators'
import { ModelBase } from './base/ModelBase'
import { immutableRelation } from '@nozbe/watermelondb/decorators'

export default class TodosTasks extends ModelBase {
  static table = 'todos_tasks'

  static associations = {
    todos: { type: 'belongs_to', key: 'todo_id' }
  }

  @field('title') title
  @readonly @date('created_at') createdAt
  @readonly @date('updated_at') updatedAt

  @field('last_pulled_at') lastPulledAt

  @relation('todos', 'todo_id') todoId
}
