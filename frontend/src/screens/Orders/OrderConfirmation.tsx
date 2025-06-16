import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, {useState} from 'react';
  import TopSection from '../../components/custom-components/TopSection';
  import {NavigationProp, ParamListBase} from '@react-navigation/native';
  import Icon from 'react-native-vector-icons/Ionicons';

const OrderConfirmation = ({
    navigation,
  }: {
    navigation: NavigationProp<ParamListBase>;
  }) => {
  return (
    <ScrollView className='bg-white h-full' showsVerticalScrollIndicator = {false}>
        <View className='p-2 m-2'>
        <TopSection
          text={'Order #345'}
          handleGoBack={() => navigation.goBack()}
        />

        {/* Delivery Top section */}
        <View className="mt-4 space-y-4">
          <View className="flex-row justify-between">
            <Text
              className="text-lg text-textColor"
              style={{fontFamily: 'Poppins-SemiBold'}}>
              Scheduled
            </Text>
            <Text
              className="text-sm text-Primary"
              style={{fontFamily: 'Poppins-Regular'}}>
              11 AM - 12PM
            </Text>
          </View>
          <View className="flex-row space-x-2 items-center">
            <Image
              source={require('../../../assets/icons/calender.png')}
              className="w-10 h-10"
            />
            <Text
              className="text-xl text-textColor"
              style={{fontFamily: 'Poppins-Medium'}}>
              September 30, 2024
            </Text>
          </View>

          <View className="flex-row space-x-4 w-[90%] items-center">
            <View className="bg-Primary w-1/3 h-1 rounded-full"></View>
            <View className="bg-Primary w-1/3 h-1 rounded-full"></View>
            <View className="bg-Primary w-1/3 h-1 rounded-full"></View>
          </View>
          <View className="mt-4">
            <Text
              className="text-lg text-textColor"
              style={{fontFamily: 'Poppins-SemiBold'}}>
              Your Order is Confirmed
            </Text>
          </View>

          <TouchableOpacity className="w-[90%] mx-auto items-center justify-center bg-[#F0F1F2] py-3 rounded-lg">
            <Text
              className="text-base text-Primary"
              style={{fontFamily: 'Poppins-SemiBold'}}>
              Show Order Details
            </Text>
          </TouchableOpacity>
        </View>


         {/* Delivery Location */}
         <View className="mt-4 space-y-4 border-b border-b-black pb-4">
          <Text
            className="text-lg text-textColor"
            style={{fontFamily: 'Poppins-SemiBold'}}>
            Delivery Location :{' '}
          </Text>
          <View className="flex-row space-x-4">
            <View className="w-10 h-10 bg-gray-200 rounded-full items-center justify-center">
              <Icon name="location-outline" size={20} color={'black'} />
            </View>
            <Text className="w-3/4" style={{fontFamily: 'Poppins-Regular'}}>
              Floor 4, Wakil Tower, Ta 131 Gulshan Badda Link Road
            </Text>
          </View>
        </View>

        {/* Price details */}
        <View className="space-y-2 mt-4">
          <View className="flex-row justify-between">
            <Text className="text-sm" style={{fontFamily: 'Poppins-Regular'}}>
              Price :{' '}
            </Text>
            <Text
              style={{fontFamily: 'Poppins-Regular'}}
              className="text-textColor">
              $55.00
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-sm" style={{fontFamily: 'Poppins-Regular'}}>
              Delivery Charge :{' '}
            </Text>
            <Text
              style={{fontFamily: 'Poppins-Regular'}}
              className="text-textColor">
              $15.00
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-sm" style={{fontFamily: 'Poppins-Regular'}}>
              Total :{' '}
            </Text>
            <Text
              style={{fontFamily: 'Poppins-Regular'}}
              className="text-textColor">
              $40.00
            </Text>
          </View>
        </View>

        {/* Payment Method */}
        <View className="mt-4">
          <Text
            className="text-lg text-textColor"
            style={{fontFamily: 'Poppins-SemiBold'}}>
            Payment Method :{' '}
          </Text>

          <View className="w-[90%] bg-[#36B37E24] mx-auto rounded-lg flex-row items-center p-4 space-x-2 mt-2">
            <View className="w-8 h-8 rounded-full bg-green-400 items-center justify-center">
              <Image
                source={require('../../../assets/icons/codWhiteIcon.png')}
              />
            </View>
            <View className="">
              <Text className="" style={{fontFamily: 'Poppins-Regular'}}>
                You selected
              </Text>
              <Text style={{fontFamily: 'Poppins-SemiBold'}}>
                Cash on Delivery
              </Text>
            </View>
            <View className="flex-1"></View>
            <Image
              source={require('../../../assets/icons/arrowRightHalf.png')}
            />
          </View>
        </View>

        <View className='mt-4 mx-auto'>
            <Text style={{fontFamily : "Poppins-Regular"}} className=''>
            Cash on derivery has some potential risks of spreading contamination. You can select other payment methods for a contactless safe delivery.
            </Text>
        </View>

        <TouchableOpacity className='w-[90%] mx-auto mt-4 bg-Primary items-center p-2 rounded-lg'>
            <Text className='text-base text-white uppercase' style={{fontFamily : "Poppins-Medium"}}>continue shopping</Text>
        </TouchableOpacity>

        <TouchableOpacity className='w-[90%] mx-auto mt-4 border border-gray-300 items-center p-2 rounded-lg'>
            <Text className='text-base text-red-500 uppercase' style={{fontFamily : "Poppins-Medium"}}>cancel order</Text>
        </TouchableOpacity>

        </View>
    </ScrollView>
  )
}

export default OrderConfirmation

const styles = StyleSheet.create({})