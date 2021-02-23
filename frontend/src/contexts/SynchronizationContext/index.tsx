import React, { createContext, useEffect } from 'react'

import Todos from '../../watermelon/models/Todos'
import api from '../../api'

import {
  synchronize,
  SyncPullArgs,
  SyncPullResult
} from '@nozbe/watermelondb/sync'
import { database } from '../../watermelon'
import { parseISO } from 'date-fns'

import { mountTodoObject, mountTodoTasksObject } from './functions'

interface ISyncContextProvider {}

const SyncContextProvider = createContext<ISyncContextProvider>({})

const SynchronizationContext: React.FC = ({ children }) => {
  const mySync = async () => {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }: SyncPullArgs): Promise<any> => {
        try {
          const response = await api.get(`/sync`, {
            params: { lastPulledAt }
          })

          const res = response.data

          const todos = mountTodoObject({ ...res?.changes?.todos })
          const todos_tasks = mountTodoTasksObject({
            ...res?.changes?.todos_tasks
          })

          return {
            changes: {
              todos,
              todos_tasks
            },
            timestamp: res.timestamp
          }
        } catch (error) {
          console.log('pullChanges', error)

          throw Error(error)
        }
      },
      pushChanges: async ({ changes, lastPulledAt }) => {
        try {
          await api.post(`/sync`, { changes }, { params: { lastPulledAt } })

          // throw new Error('Testando')
        } catch (error) {
          console.log('pushChanges', error)

          throw Error(error)
        }
      }
    })
  }

  useEffect(() => {
    mySync()
  }, [])

  return (
    <SyncContextProvider.Provider value={{}}>
      {children}
    </SyncContextProvider.Provider>
  )
}

export default SynchronizationContext
