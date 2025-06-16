import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react'
import Orders from '../screens/Orders/Orders';
import OrderDetails from '../screens/Orders/OrderDetails';
import OrderCompleted from '../screens/Orders/OrderCompleted';
import OrderConfirmation from '../screens/Orders/OrderConfirmation';

const Stack = createNativeStackNavigator();

const OrderStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='OrderScreen'>
        <Stack.Screen name="OrderScreen" component={Orders} />
        <Stack.Screen name="OrderDetails" component={OrderDetails} />
        <Stack.Screen name="OrderCompleted" component={OrderCompleted} />
        <Stack.Screen name="OrderConfirmation" component={OrderConfirmation} />
  </Stack.Navigator>
  )
}

export default OrderStack