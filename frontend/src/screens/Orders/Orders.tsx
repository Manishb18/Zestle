import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import TopSection from '../../components/custom-components/TopSection';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import CartCustomButton from '../../components/custom-components/CartCustomButton';
import EmptyOrder from '../EmptyScreens/EmptyOrder';

const OngoingSection = ({ orders, onDetailsClick, navigation }: { orders: any, onDetailsClick : ()=>void, navigation: NavigationProp<ParamListBase>}) => {

  if(!orders || orders.length !== 0){
    return (
      <EmptyOrder navigation={navigation}/>
    )
  }
  return (
    <View className="p-4">
      {orders.map((order) => (
        <View key={order?.id} className="border-b border-gray-300 pb-4 mb-4 space-y-2">
          <View className='flex-row justify-between items-center'>
            <View className='space-y-2'>
              <Text style={{fontFamily : "Poppins-Regular"}} className='text-xs text-[#4E424C80]'>Order #{order.id}</Text>
              <Text style={{fontFamily : "Poppins-Regular"}} className='text-base text-textColor'>
                Amount : {"  "}
                <Text className='text-Primary text-lg' style={{fontFamily : "Poppins-SemiBold"}}>${order.amount}</Text></Text>
              <Text style={{fontFamily : "Poppins-Regular"}} className='text-Primary text-xs'>{order.status}</Text>
            </View>
            <View>
              <Image source = {require("../../../assets/images/Logo_ordersScreen.png")} className='' />
            </View>
          </View>
          <View className='flex-row flex-wrap items-center space-y-2'>
            {order.items.map((item)=>(
              <View className='bg-gray-200 rounded-lg p-2 mx-2'>
                <Text className='text-[10px] text-textColor' style={{fontFamily : "Poppins-Regular"}}>{item}</Text>
              </View>
            ))}
          </View>

          <View className='flex-row justify-around mt-4'>
            <TouchableOpacity className='bg-[#D4DB281A] rounded-lg w-40 h-12 items-center justify-center' onPress={onDetailsClick}>
              <Text className="text-Primary" style={{fontFamily : "Poppins-Regular"}}>Order Details</Text>
            </TouchableOpacity>
            <TouchableOpacity className='bg-[#D4DB281A] rounded-lg w-40 h-12 items-center justify-center'>
              <Text className="text-Primary" style={{fontFamily : "Poppins-Regular"}}>Track Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const HistroySeciton = ({orderHistory} : {orderHistory  : any}) => {
  return (
    <View className='space-y-4'>
      {orderHistory.map((order: any) => (
        <View key={order.id} className={`border-b border-gray-300 rounded-lg p-4 flex-row justify-between items-center `}>
          <View className='flex-row items-center space-x-4'>
            <View className={`${order.status === 'Delivered' ? 'bg-green-300' : 'bg-red-100'} rounded-full w-10 h-10 items-center justify-center`}>
              <Image source={require("../../../assets/icons/basket.png")} resizeMode='cover'/>
            </View>
            <View className='space-y-1'>
            <Text className='text-base text-textColor' style={{fontFamily : "Poppins-Medium"}}>Order #{order.id}</Text>
            <Text className={`text-xs ${order.status === 'Delivered' ? 'text-green-600' : 'text-red-600'}`} style={{fontFamily : "Poppins-Regular"}}>{order.status}</Text>
            <Text className='text-xs text-gray-500' style={{fontFamily : "Poppins-Regular"}}>{order.date}</Text>
            </View>
          </View>
          <Text className='text-sm' style={{fontFamily : "Poppins-SemiBold"}}>${order.amount.toFixed(2)}</Text>
        </View>
      ))}
    </View>
  );
};

const Orders = ({navigation}: {navigation: NavigationProp<ParamListBase>}) => {
  const [orders, setOrders] = useState([
    {
      id: 345,
      amount: 65.00,
      status: 'Out for delivery',
      items: ['Apricot', 'Strawberry', 'Melon', 'Pineapple', 'Lemon', 'Kiwi']
    },
    {
      id: 556,
      amount: 89.60,
      status: 'Out for delivery',
      items: ['Carrot', 'Dragon Fruit', 'Milk', 'Jujube', 'Banana', 'Apple', 'Lychee']
    },
    {
      id: 879,
      amount: 42.90,
      status: 'Out for delivery',
      items: ['Cabbage', 'Pineapple', 'Coconut', 'Drupe', 'Grapes', 'Eggplant']
    }
  ]);
  const [orderHistory, setOrderHistory] = useState([
    {
      id: 345,
      amount: 100.00,
      status: 'Delivered',
      date: 'July 26, 2017'
    },
    {
      id: 345,
      amount: 300.00,
      status: 'Cancelled',
      date: 'June 26, 2017'
    }
  ]);

  const [pageViewing, setPageViewing] = useState('ongoing');

  const handlePageChange = (page : string)=>{
    setPageViewing(page);
  };

  const handleDetailsClick = ()=>{
    // navigation.navigate("OrderDetails");
    // navigation.navigate("OrderCompleted");
    navigation.navigate("OrderConfirmation");
  }

  return (
    <ScrollView className="bg-white h-full">
        <View className='m-2'>
      <TopSection text={'Orders'} handleGoBack={() => navigation.goBack()} />
        </View>
        <View className='flex-row w-full mt-4'>
            <TouchableOpacity className={`w-1/2 ${pageViewing == 'ongoing' ?'border-b-2 border-b-Primary': 'border-b border-b-[#4E424C66]'} py-2`} onPress={()=>handlePageChange("ongoing")}>
                <Text className={`text-base ${pageViewing == 'ongoing' && 'text-Primary'} text-center`} style = {{fontFamily:"Poppins-Regular"}}>Ongoing</Text>
            </TouchableOpacity>
            <TouchableOpacity className={`w-1/2 ${pageViewing == 'history' ?'border-b-2 border-b-Primary': 'border-b border-b-[#4E424C66]'}  py-2`} onPress={()=>handlePageChange("history")}>
                <Text className={`text-base text-${pageViewing == 'history' && 'Primary'} text-center`} style = {{fontFamily:"Poppins-Regular"}}>History</Text>
            </TouchableOpacity>
        </View>
        {pageViewing == "ongoing" && 
        <OngoingSection orders={orders} onDetailsClick = {handleDetailsClick} navigation = {navigation}/>
        }
         {pageViewing == "history" && 
        <HistroySeciton orderHistory={orderHistory} />
      }
    </ScrollView>
  );
};

export default Orders;

const styles = StyleSheet.create({});
