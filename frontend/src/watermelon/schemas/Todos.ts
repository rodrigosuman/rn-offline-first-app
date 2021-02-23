import { TableSchemaSpec } from '@nozbe/watermelondb/Schema'

export const todosSchema: TableSchemaSpec = {
  name: 'todos',
  columns: [
    { name: 'server_id', isOptional: false, type: 'string', isIndexed: true },
    { name: 'title', isOptional: false, type: 'string' },
    { name: 'observation', type: 'string' },
    { name: 'checked', type: 'boolean' },
    { name: 'created_at', type: 'number' },
    { name: 'updated_at', type: 'number' },
    { name: 'last_pulled_at', type: 'string' }
  ]
}
