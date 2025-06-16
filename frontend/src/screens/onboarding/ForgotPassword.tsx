import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomButton from '../../components/custom-components/CustomButton';
import { NavigationProp } from '@react-navigation/native';

const ForgotPassword = ({navigation}: {navigation: NavigationProp<any>}) => {
  const handleBack = () => {
    navigation.goBack()
  } 
  return (
    <View className="flex-1 bg-white p-4">
      {/* Header */}
      <View className="flex-row items-center mb-6">
        <TouchableOpacity onPress={handleBack}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold ml-4 text-[#4E424C]" style={{fontFamily: 'Poppins-SemiBold'}}>Forgot Password</Text>
      </View>

      {/* Content */}
      <View className="mt-4 p-2">
        <Text className="text-xl font-semibold text-[#7CB342] mb-2" style={{fontFamily: 'Poppins-Medium'}}>Forgot Password</Text>
        <Text className="text-gray-500 mb-6" style={{fontFamily: 'Poppins-Regular'}}>OTP will send to registered mobile number</Text>

        {/* Phone Number Input */}
        <View className="bg-gray-100 rounded-3xl p-4 mb-8">
          <TextInput
            placeholder="Phone Number"
            keyboardType="phone-pad"
            className="text-base"
            style={{fontFamily: 'Poppins-Regular'}}
          />
        </View>

        {/* Send Button */}
        <View className="w-1/2 mx-auto">
          <CustomButton title="Send" onPress={() => {}} additionalStyles='mt-4' />
        </View>
      </View>
    </View>
  );
};

export default ForgotPassword;