import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TopSection from '../../components/custom-components/TopSection';
import {navigationProp} from '../../types';

const Vouchers = ({navigation}: {navigation: navigationProp}) => {
  return (
    <View className='p-4 bg-white h-full'>
      <TopSection
        text={'Voucher'}
        handleGoBack={() => navigation.goBack()}
      />

      <View className='bg-gray-300 w-full h-40 relative overflow-hidden rounded-md mt-12'>
        <View className='absolute bg-white w-12 h-12 rounded-full -left-6 top-12 z-10'/>
        <View className='absolute bg-white w-12 h-12 rounded-full -right-6 top-12 z-10'/>
        <ImageBackground source={require("../../../assets/images/voucher1.jpg")} className='w-full h-full' resizeMode='cover'>
        <Text className='text-center my-auto text-base text-textColor w-1/2 mx-auto' style={{fontFamily : "Poppins-SemiBold"}}>Grab upto 30% on your next order</Text>
        </ImageBackground>
      </View>
    </View>
  )
}

export default Vouchers
const styles = StyleSheet.create({})