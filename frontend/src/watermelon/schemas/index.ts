import { appSchema, tableSchema } from '@nozbe/watermelondb'
import { todosSchema } from './Todos'
import { todosTasksSchema } from './TodosTasks'

export const mySchema = appSchema({
  version: 1,
  tables: [tableSchema(todosSchema), tableSchema(todosTasksSchema)]
})
