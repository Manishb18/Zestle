import { View, Text } from 'react-native'
import React from 'react'
import AppNavigator from './navigation/AppNavigator'
import { Provider } from 'react-redux'
import { store } from './redux/store/store'
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();
console.warn = () => {};
const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator/>
    </Provider>
  )
}

export default App