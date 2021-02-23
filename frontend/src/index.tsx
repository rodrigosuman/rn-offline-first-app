import React from 'react'
import {
  SafeAreaView,
  StatusBar,
  StatusBarIOS,
  StyleSheet,
  Text,
  View
} from 'react-native'
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider'
import { database } from './watermelon'

import Navigation from './navigation'

import SynchronizationContext from './contexts/SynchronizationContext'

import { NavigationContainer } from '@react-navigation/native'

const App = () => {
  return (
    <React.Fragment>
      <StatusBar backgroundColor="#090909" />
      <DatabaseProvider database={database}>
        <SynchronizationContext>
          <SafeAreaView style={styles.main}>
            <View style={styles.container}>
              <NavigationContainer>
                <Navigation />
              </NavigationContainer>
            </View>
          </SafeAreaView>
        </SynchronizationContext>
      </DatabaseProvider>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1
  },
  container: {
    flex: 1
  }
})

export default App
