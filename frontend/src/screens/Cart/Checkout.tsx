import {Image, Pressable,  Text, View} from 'react-native';
import React, {useState} from 'react';
import TopSection from '../../components/custom-components/TopSection';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import CartCustomButton from '../../components/custom-components/CartCustomButton';
import Icon from 'react-native-vector-icons/Ionicons';
import Address from '../../components/Home/Address';

const Checkout = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  return (
    <View className='p-4 bg-white h-full'>
       <TopSection
        text={'Checkout'}
        handleGoBack={() => navigation.goBack()}
      />
      <View className='mt-4 space-y-4 h-full'>
        <Text style={{fontFamily: 'Poppins-Medium'}}
          className="text-textColor text-lg">ADD Address : </Text>
          <Pressable className='bg-gray-200 p-2 items-center rounded-lg' onPress={()=>navigation.navigate("Location")}>
            <Icon name='add-outline' size={24} color={"black"}/> 
          </Pressable>

          <Text>Saved Address</Text>
          <Address/>
          <View className='flex-1'/>
          <View className='space-y-2 w-[90%] mx-auto mb-16'>
          <View className='border border-gray-400 p-2 rounded-lg items-center'>
            <Text className='text-textColor' style={{fontFamily : "Poppins-Regular"}}>Cash on Delivery</Text>
          </View>
          <View>
           < CartCustomButton text='online payment' onPressHandler={()=>navigation.navigate("Payment")}/>
          </View>
          </View>
      
      </View>
    </View>
  )
}

export default Checkout