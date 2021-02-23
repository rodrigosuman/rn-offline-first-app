import withObservables from '@nozbe/with-observables'
import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { Alert, FlatList, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import MainIcon from '../../resources/MainIcon'
import Todos from '../../watermelon/models/Todos'
import TodosTasks from '../../watermelon/models/TodosTasks'

import { styles } from './styles'

interface IProps {
  todo: Todos
  tasks: Array<TodosTasks>
}

const EnhancedComponent: React.FC<IProps> = props => {
  const navigation = useNavigation()
  const { tasks, todo } = props

  const onHandleDelete = useCallback(() => {
    Alert.alert('Deletar tarefa', 'Deseja deletar essa tarefa?', [
      {
        style: 'cancel',
        text: 'Não'
      },
      {
        text: 'Sim',
        style: 'default',
        onPress: async () => {
          await todo.deleteRecord()
          navigation.goBack()
        }
      }
    ])
  }, [])

  const onAddTask = useCallback(() => {
    return todo.addTask()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{todo.title}</Text>

        <Text style={styles.observations}>{todo.observation}</Text>
      </View>
      <View style={styles.tasksContainers}>
        <View style={styles.tasksHeader}>
          <Text style={{ ...styles.buttonText, fontSize: 20 }}>Tasks</Text>
          <TouchableOpacity onPress={async () => await onAddTask()}>
            <MainIcon name="plus-box" size={30} color="#f7f7f7" />
          </TouchableOpacity>
        </View>
        <FlatList
          style={styles.tasksFlatList}
          data={tasks}
          keyExtractor={(task: TodosTasks) => task.id}
          renderItem={({ item }: { item: TodosTasks }) => (
            <View style={styles.taskContainer}>
              <MainIcon
                name="checkbox-marked-outline"
                size={15}
                color="#78ffcb"
              />
              <Text style={styles.task}>{item.title}</Text>
            </View>
          )}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListTextStyle}>
              Nenhuma task cadastrada
            </Text>
          )}
        />
        <View style={styles.buttons}>
          <TouchableOpacity onPress={onHandleDelete}>
            <View style={styles.button}>
              <MainIcon name="delete" color="#f7f7f730" size={25} />
              <Text style={styles.buttonText}>Deletar</Text>
            </View>
          </TouchableOpacity>
          {!todo.checked ? (
            <React.Fragment>
              <TouchableOpacity
                onPress={async () => await todo.toggleChecked()}
              >
                <View style={styles.button}>
                  <MainIcon name="check-bold" size={25} color="#f7f7f730" />
                  <Text style={styles.buttonText}>Concluir</Text>
                </View>
              </TouchableOpacity>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <View style={styles.button}>
                <MainIcon name="check-bold" size={25} color="#f7f7f730" />
                <Text style={styles.concludedButtonText}>Concluído</Text>
              </View>
            </React.Fragment>
          )}
        </View>
      </View>
    </View>
  )
}

const enhance = withObservables(['todo'], ({ todo }: any) => ({
  todo: todo.observe(),
  tasks: todo.tasks.observe()
}))

export default enhance(EnhancedComponent)
