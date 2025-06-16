import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home/Home';
import Search from '../screens/Home/Search';
import Categories from '../screens/Home/Categories';
import ProductDetails from '../screens/Home/ProductDetails';
import SingleProductCard from '../components/Home/SingleProductCard';
import AppStack from './AppStack';
import Profile from '../screens/Profile/Profile';
import EditProfile from '../screens/Profile/EditProfile';
import ProfileStack from './ProfileStack';
import Cart from '../screens/Home/Cart';
import CartStack from './CartStack';
import ProductStack from './ProductStack';
import Products from '../screens/Products/Products';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="Product" component={ProductDetails}/>
      <Stack.Screen name="Profile" component={ProfileStack}/>
      <Stack.Screen name="Cart" component={CartStack}/>
    </Stack.Navigator>
  );
};

export default HomeStack;