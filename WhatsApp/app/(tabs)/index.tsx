import {  View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import User from './src/screens/User';
import Home from './src/screens/Home';
import { Provider } from 'react-redux';
import { store } from './src/store/Store';
const Stack = createNativeStackNavigator();
export default function HomeScreen() {
  return (
    <Provider store={store}>
    <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="User" component={User} />
  </Stack.Navigator>
  </Provider>
  );
}

