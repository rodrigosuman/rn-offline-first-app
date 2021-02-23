import withObservables from '@nozbe/with-observables'
import { format } from 'date-fns'
import { parseISO } from 'date-fns/esm'
import React, { useCallback } from 'react'
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import Checkbox from '../../components/Checkbox'
import Todos from '../../watermelon/models/Todos'
import TodosTasks from '../../watermelon/models/TodosTasks'

import MainIcon from '../../resources/MainIcon'

import { styles } from './styles'
import { useNavigation } from '@react-navigation/native'
import { RoutesEnum } from '../../navigation/types'

interface IProps {
  todo: Todos
  tasks: Array<TodosTasks>
}

const TodoItem: React.FC<IProps> = ({ todo, tasks }: IProps) => {
  const navigation = useNavigation()

  const onHandleDelete = useCallback(() => {
    Alert.alert('Deletar tarefa', 'Deseja deletar essa tarefa?', [
      {
        style: 'cancel',
        text: 'Não'
      },
      {
        text: 'Sim',
        style: 'default',
        onPress: async () => await todo.deleteRecord()
      }
    ])
  }, [])

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(RoutesEnum.TODO_DETAILS, { todo })}
      activeOpacity={1}
    >
      <View style={[styles.todoItemContainer, styles.defaultBorderRadius]}>
        <View style={styles.todoHeader}>
          <View style={styles.todoTitleContainer}>
            <Text style={styles.todoTitle}>{todo.title}</Text>
            <Text style={styles.todoObservation}>
              {todo.observation || '--------'}
            </Text>
          </View>

          <Text style={styles.todoDate}>{todo.id}</Text>
        </View>

        <View style={styles.todoButtons}>
          <Checkbox checked={todo.checked} />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const enhance = withObservables(['todo'], ({ todo }: any) => ({
  todo: todo.observe(),
  tasks: todo.tasks.observe()
}))

export default enhance(TodoItem)
