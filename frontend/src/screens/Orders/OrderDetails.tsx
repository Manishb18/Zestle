// src/screens/Orders/OrderDetails.tsx
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import TopSection from '../../components/custom-components/TopSection';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const OrderSection = () => {
  const [orders, setOrders] = useState([
    {
      image: '../../../assets/images/PopularItems/oranges.png', // Updated image path
      name: 'Oranges',
      quantity: '1x25',
      price: 25.0,
    },
    {
      image: '../../../assets/images/PopularItems/tomatoes.png', // Existing image path
      name: 'Tomatoes',
      quantity: '2x15',
      price: 30.0,
    },
  ]);

  return (
    <View className='mt-4'>
      <Text className='text-lg text-textColor ml-4' style={{fontFamily: "Poppins-SemiBold"}}>Your Order:</Text>
      <View className="space-y-8 m-4 mt-8 border-b border-b-gray-300 pb-4">
        {orders.map((item, index) => (
          <View className="flex-row justify-between" key={index}>
            <View className="flex-row space-x-4 items-center">
              <View className="bg-gray-200 w-20 h-20 rounded-lg">
                <Text>Image</Text>
              </View>
              <View className='space-y-2'>
                <Text className="text-Primary text-sm" style={{fontFamily: 'Poppins-Medium'}}>
                  {item.name}
                </Text>
                <Text style={{fontFamily: 'Poppins-Regular'}} className='text-textColor'>
                  {item.quantity}
                </Text>
              </View>
            </View>
            <View className="flex-row items-center">
              <Text className="text-textColor text-lg" style={{fontFamily: 'Poppins-Medium'}}>${item.price}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const OrderDetails = ({navigation}: {navigation: NavigationProp<ParamListBase>}) => {
  const orderDetails = {
    orderNumber: '#345',
    paymentDetails: 'Cash on delivery',
    phoneNumber: '98356xxxxxx',
    date: 'November 30, 2021',
    address: 'Floor 4, Wakil Tower, Ta 131 Gulshan\nBadda Link Road',
    totalPrice: 40.0,
    deliveryCharge: 15.0,
    finalTotal: 55.0,
  };

  return (
    <SafeAreaView>
      <ScrollView className='p-2'>
        <TopSection text={'Order Details'} handleGoBack={() => navigation.goBack()} />
        <OrderSection />
        <View className='mx-4'>
          <View className='flex-row justify-between'>
            <Text className='text-sm' style={{fontFamily: "Poppins-Regular"}}>Price : </Text>
            <Text style={{fontFamily: "Poppins-Regular"}} className='text-textColor'>${orderDetails.finalTotal}</Text>
          </View>
          <View className='flex-row justify-between'>
            <Text className='text-sm' style={{fontFamily: "Poppins-Regular"}}>Delivery Charge : </Text>
            <Text style={{fontFamily: "Poppins-Regular"}} className='text-textColor'>${orderDetails.deliveryCharge}</Text>
          </View>
          <View className='flex-row justify-between'>
            <Text className='text-sm' style={{fontFamily: "Poppins-Regular"}}>Total : </Text>
            <Text style={{fontFamily: "Poppins-Regular"}} className='text-textColor'>${orderDetails.totalPrice}</Text>
          </View>
        </View>
        {/* Display Order Details */}
        <View className="m-4 space-y-2">
          <Text className='text-lg text-textColor border-b border-gray-300 pb-1' style={{fontFamily: "Poppins-SemiBold"}}>Order Details:</Text>
          <View>
            <Text className='text-base text-textColor' style={{fontFamily: "Poppins-Medium"}}>Order Number: </Text>
            <Text style={{fontFamily: "Poppins-Regular"}} className='text-[#37474F80]'>{orderDetails.orderNumber}</Text>
          </View>
          <View>
            <Text className='text-base text-textColor' style={{fontFamily: "Poppins-Medium"}}>Payment Details</Text>
            <Text style={{fontFamily: "Poppins-Regular"}} className='text-[#37474F80]'>{orderDetails.paymentDetails}</Text>
          </View>
          <View>
            <Text className='text-base text-textColor' style={{fontFamily: "Poppins-Medium"}}>Phone Number: </Text>
            <Text style={{fontFamily: "Poppins-Regular"}} className='text-[#37474F80]'>{orderDetails.phoneNumber}</Text>
          </View>
          <View>
            <Text className='text-base text-textColor' style={{fontFamily: "Poppins-Medium"}}>Date: </Text>
            <Text style={{fontFamily: "Poppins-Regular"}} className='text-[#37474F80]'>{orderDetails.date}</Text>
          </View>
          <View>
            <Text className='text-base text-textColor' style={{fontFamily: "Poppins-Medium"}}>Address: </Text>
            <Text style={{fontFamily: "Poppins-Regular"}} className='text-[#37474F80]'>{orderDetails.address}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({});