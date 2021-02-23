import React, { useCallback, useRef } from 'react'
import {
  Alert,
  FlatList,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

import { styles } from './styles'
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider'
import { v4 } from 'react-native-uuid'

import MainIcon from '../../resources/MainIcon'
import Todos from '../../watermelon/models/Todos'
import TodoItem from './TodoItem'
import withObservables from '@nozbe/with-observables'

const TodoList: React.FC = ({ todos, database, ...props }: any) => {
  const textInputValue = useRef<string>('')
  const textInputRef = useRef<TextInput>(null)

  const createTodo = useCallback(async () => {
    if (!textInputValue.current.length) {
      return Alert.alert('Informe uma tarefa')
    }

    const todoCollection = database.collections.get('todos')

    await database.action(async () => {
      await todoCollection.create((todo: Todos) => {
        todo._raw.id = v4()
        todo.title = textInputValue.current
      })

      textInputValue.current = ''
      textInputRef.current?.clear()
    })
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarefas</Text>

      <View
        style={[
          styles.textInputContainer,
          styles.defaultBorderRadius,
          styles.defaultShadow
        ]}
      >
        <TextInput
          ref={textInputRef}
          placeholderTextColor="#ffffff88"
          style={styles.textInput}
          placeholder="Adicionar TODO"
          onChangeText={value => (textInputValue.current = value)}
        />

        <TouchableOpacity style={[styles.addButton]} onPress={createTodo}>
          <MainIcon name="plus-thick" color="#ffffff80" size={25} />
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.todoFlatList}
        data={todos}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }: { item: Todos }) => <TodoItem todo={item} />}
        ListEmptyComponent={() => (
          <Text style={styles.emptyListTextStyle}>
            Nenhuma tarefa para fazer
          </Text>
        )}
      />
    </View>
  )
}

const enhance = withObservables([], ({ database }: any) => ({
  todos: database.collections.get('todos').query().observe()
}))

export default withDatabase(enhance(TodoList))
