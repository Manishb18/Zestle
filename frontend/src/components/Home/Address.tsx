import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

const Address = () => {
  const [addresses, setAddresses] = useState([
    {
      type: 'Work',
      addressLine: '301 8-2-684/4/5',
      locality: 'Anand Banjara Colony, Banjara Hills',
      city: 'Hyderabad',
      state: 'Telangana',
      postalCode: '500034',
      phone: '+1-563-893-5698',
    },
    {
      type: 'Home',
      addressLine: '301 8-2-684/4/5',
      locality: 'Anand Banjara Colony, Banjara Hills',
      city: 'Hyderabad',
      state: 'Telangana',
      postalCode: '500034',
      phone: '+1-563-893-5698',
    },
  ]);
  return (
    <View className="space-y-2 mt-8 ">
      {addresses.map((address, index) => (
        <View className="flex-row space-x-2  rounded-lg p-2 justify-between border-b border-black">
          <View className="bg-gray-600 w-6 h-6 rounded-lg my-auto">
            <View></View>
          </View>
          <View>
            <Text
              className="text-base text-Primary"
              style={{fontFamily: 'Poppins-Regular'}}>
              {address.type}
            </Text>
            <Text style={{fontFamily: 'Poppins-Regular'}}>
              {address.addressLine}
            </Text>
            <Text style={{fontFamily: 'Poppins-Regular'}}>
              {address.locality}
            </Text>
            <View className="flex-row space-x-2">
              <Text style={{fontFamily: 'Poppins-Regular'}}>
                {address.city}
              </Text>
              <Text style={{fontFamily: 'Poppins-Regular'}}>
                {address.state}
              </Text>
              <Text style={{fontFamily: 'Poppins-Regular'}}>
                {address.postalCode}
              </Text>
            </View>
            <Text className="mt-2" style={{fontFamily: 'Poppins-Regular'}}>
              {address.phone}
            </Text>
          </View>
          <View>
            <Image source={require('../../../assets/images/threeDots.png')} />
          </View>
        </View>
      ))}
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({});
