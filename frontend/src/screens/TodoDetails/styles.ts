import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090909'
  },
  tasksContainers: {
    flex: 1,
    backgroundColor: '#ffffff15',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20
  },
  tasksFlatList: {
    flex: 1,
    paddingHorizontal: 15
  },
  buttons: {
    backgroundColor: '#191919',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 12,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20
  },
  buttonText: {
    fontSize: 18,
    color: '#f7f7f7f0',
    fontWeight: 'bold',
    marginLeft: 8
  },
  concludedButtonText: {
    fontSize: 18,
    color: '#f7f7f745',
    fontWeight: 'bold',
    marginLeft: 8
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  header: {
    paddingHorizontal: 15,
    paddingVertical: 25
  },
  title: {
    color: '#f7f7f7',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30
  },
  observations: {
    color: '#f7f7f780',
    fontSize: 16
  },
  emptyListTextStyle: {
    color: '#f7f7f760',
    textAlign: 'center',
    fontSize: 18
  },
  tasksHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 10,
    paddingVertical: 15
  },
  task: {
    color: '#f7f7f760',
    fontSize: 15,
    marginLeft: 15
  },
  taskContainer: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center'
  }
})
