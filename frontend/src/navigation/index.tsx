import React from 'react'
import TodoList from '../screens/TodoList'

import { createStackNavigator } from '@react-navigation/stack'
import TodoDetails from '../screens/TodoDetails'
import { RoutesEnum } from './types'

const Stack = createStackNavigator()

const Navigation: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName={RoutesEnum.TODO_LIST}>
      <Stack.Screen
        name={RoutesEnum.TODO_LIST}
        options={{
          headerShown: false
        }}
        component={TodoList}
      />

      <Stack.Screen
        name={RoutesEnum.TODO_DETAILS}
        component={TodoDetails}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}

export default Navigation
