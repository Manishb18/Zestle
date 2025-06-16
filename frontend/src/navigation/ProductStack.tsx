import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react'
import Products from '../screens/Products/Products';
import ProductDetails from '../screens/Home/ProductDetails';

const Stack = createNativeStackNavigator();
const ProductStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Products'>
      <Stack.Screen name='Products' component={Products}  />
      <Stack.Screen name='Product' component={ProductDetails} />
    </Stack.Navigator>
  )
}

export default ProductStack