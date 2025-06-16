import React, {useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store/store';
import { getUser } from '../redux/features/user/authThunks';
import { AppDispatch } from '../redux/store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppNavigator = () => {
    const dispatch = useDispatch<AppDispatch>();
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
    console.log(isAuthenticated);

    useEffect(() => {
        dispatch(getUser());
    }, []);

    return (
        <NavigationContainer>
            {isAuthenticated ? (
                <AppStack />
            ) : (
                <AuthStack />
            )}
        </NavigationContainer>
    );
}

export default AppNavigator;
