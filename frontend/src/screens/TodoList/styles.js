import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090909',
    paddingHorizontal: 15,
    paddingTop: '25%'
  },
  title: {
    color: '#ffffff',
    fontSize: 27,
    marginBottom: 30,
    fontWeight: 'bold',
    textAlign: 'center'
    // textTransform: 'uppercase'
  },
  defaultShadow: {
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 3
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 6
  },
  defaultBorderRadius: {
    borderRadius: 6
  },
  textInputContainer: {
    backgroundColor: '#ffffff50',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden'
  },
  textInput: {
    fontSize: 15,
    paddingHorizontal: 15,
    paddingVertical: 8,
    flex: 1,
    color: '#fff'
  },
  addButton: {
    backgroundColor: '#ffffff20',
    height: '100%',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  addText: {
    color: '#ffffff20',
    alignSelf: 'center',
    fontSize: 15
  },
  todoFlatList: {
    marginTop: 30,
    flex: 1
  },
  todoItemContainer: {
    paddingVertical: 10,
    marginBottom: 15,
    backgroundColor: '#ffffff25',
    // borderRadius: 8,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  todoDate: {
    color: '#f7f7f760',
    fontSize: 12
  },
  todoTitle: {
    color: '#f7f7f7',
    fontSize: 17,

    marginBottom: 8
  },
  todoObservation: {
    color: '#a0a0a0',
    fontSize: 16
  },
  todoHeader: {
    
    flex: 1
  },
  todoTitleContainer: {
    
    marginRight: 15
  },
  emptyListTextStyle: {
    color: '#f7f7f760',
    textAlign: 'center',
    fontSize: 18
  },

  todoButtons: {
    justifyContent: 'space-between',
    
  }
})
