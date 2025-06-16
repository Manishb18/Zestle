import { StyleSheet, Text, View } from 'react-native'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react'
import Cart from '../screens/Home/Cart';
import Schedule from '../screens/Cart/Schedule';
import Checkout from '../screens/Cart/Checkout';
import Location from '../screens/Cart/Location';
import Payment from '../screens/Cart/Payment';

const Stack = createNativeStackNavigator();

const CartStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='CartScreen'>
        <Stack.Screen name="CartScreen" component={Cart} />
        <Stack.Screen name="Schedule" component={Schedule} />
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="Location" component={Location} />
        <Stack.Screen name="Payment" component={Payment} />
  </Stack.Navigator>
  )
}

export default CartStack

const styles = StyleSheet.create({})