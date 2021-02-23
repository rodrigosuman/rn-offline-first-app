import { TableSchemaSpec } from '@nozbe/watermelondb/Schema'

export const todosTasksSchema: TableSchemaSpec = {
  name: 'todos_tasks',
  columns: [
    { name: 'title', isOptional: false, type: 'string' },
    { name: 'todo_id', type: 'string' },
    { name: 'created_at', type: 'number' },
    { name: 'updated_at', type: 'number' },
    { name: 'last_pulled_at', type: 'string' }
  ]
}
