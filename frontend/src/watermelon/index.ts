import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import Todos from './models/Todos'
import TodosTasks from './models/TodosTasks'

import migrations from './models/migrations'

import { mySchema } from './schemas'

const adapter = new SQLiteAdapter({
  schema: mySchema,
  migrations
})

export const database = new Database({
  adapter,
  modelClasses: [Todos, TodosTasks],
  actionsEnabled: true
})
