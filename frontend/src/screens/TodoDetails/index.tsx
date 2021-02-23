import { Q } from '@nozbe/watermelondb'
import { useDatabase } from '@nozbe/watermelondb/hooks'
import { RouteProp, useRoute } from '@react-navigation/native'
import React from 'react'
import { View } from 'react-native'
import Todos from '../../watermelon/models/Todos'
import TodosTasks from '../../watermelon/models/TodosTasks'
import EnhancedComponent from './EnhancedComponent'

// import { Container } from './styles';
interface IRoute {
  params: {
    todo: Todos
  }
}

const TodoDetails: React.FC<IRoute> = () => {
  const { params } = useRoute() as IRoute
  return <EnhancedComponent todo={params.todo} />
}

export default TodoDetails
