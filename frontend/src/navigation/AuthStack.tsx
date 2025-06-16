import React from 'react';
import { StyleSheet, View } from 'react-native';
import Splash from '../screens/onboarding/Splash';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signin from '../screens/onboarding/Signin';
import Signup from '../screens/onboarding/Signup';
import OTPScreen from '../screens/onboarding/OTPScreen';
import ForgotPassword from '../screens/onboarding/ForgotPassword';
import SplashFill from '../screens/onboarding/SplashFill';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="splash" component={SplashFill} />
            <Stack.Screen name="Signin" component={Signin} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="otp" component={OTPScreen} />
            <Stack.Screen name="forgotPassword" component={ForgotPassword} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({})

export default AuthStack;
