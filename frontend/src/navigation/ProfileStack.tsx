import { StyleSheet, Text, View } from 'react-native'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react'
import Profile from '../screens/Profile/Profile';
import EditProfile from '../screens/Profile/EditProfile';
import Reviews from '../screens/Profile/Reviews';
import Vouchers from '../screens/Profile/Vouchers';
import Notifications from '../screens/Profile/Notifications';
import Help from '../screens/Profile/Help';
import Addresses from '../screens/Profile/Addresses';
import OrderStack from './OrderStack';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='ProfileScreen'>
      <Stack.Screen name="ProfileScreen" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Ratings" component={Reviews} />
      <Stack.Screen name="Addresses" component={Addresses} />
      <Stack.Screen name="Orders" component={OrderStack} />
      <Stack.Screen name="Vouchers" component={Vouchers} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Help" component={Help} />
    </Stack.Navigator>
  )
}

export default ProfileStack

const styles = StyleSheet.create({})