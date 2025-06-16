import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomButton from '../../components/custom-components/CustomButton';
import { NavigationProp } from '@react-navigation/native';

const OTPScreen = ({navigation}: {navigation: NavigationProp<any>}) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value !== '' && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

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
        <Text className="text-lg  ml-4 text-[#4E424C]" style={{fontFamily: 'Poppins-SemiBold'}}>OTP</Text>
      </View>

      {/* Content */}
      <View className="mt-4">
        <Text className="text-2xl  text-[#7CB342] mb-2" style={{fontFamily: 'Poppins-Regular'}}>Enter Verification Code</Text>
        <View className='mb-8'>
        <Text className="text-gray-500 text-lg" style={{fontFamily: 'Poppins-Regular'}}>
            We have sent SMS to 
            </Text>
        <Text className='text-[#37474F] font-bold text-lg'>91XXXXXXXXXX</Text>
        </View>
        

        {/* OTP Input */}
        <View className="flex-row justify-between mb-6 px-4">
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              className="w-16 h-16 bg-[#4E434D1A] rounded-md text-center text-lg font-semibold"
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
            />
          ))}
        </View>

        {/* Resend OTP and Timer */}
        <View className="flex-row justify-between mb-8 px-4">
          <TouchableOpacity>
            <Text className="text-[#F15A23]">Resend OTP</Text>
          </TouchableOpacity>
          <Text className="text-gray-500">00:00</Text>
        </View>

        {/* Next Button */}
        <View className="w-1/2 mx-auto">
          <CustomButton title="Next" onPress={() => {}} />
        </View>
      </View>
    </View>
  );
};

export default OTPScreen;