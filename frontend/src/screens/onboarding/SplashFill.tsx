import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationProp} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

const SplashFill = ({navigation}: {navigation: NavigationProp<any>}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Signin');
    }, 2000);
  }, []);

  return (
    <SafeAreaView className="h-full bg-[#F9FADF]">
      <View className="flex justify-center items-center h-full">
        <Image
          source={require('../../../assets/images/Freshli-Logo.png')}
          className="w-96 h-84"
        />
      </View>
    </SafeAreaView>
  );
};

export default SplashFill;

const styles = StyleSheet.create({});
