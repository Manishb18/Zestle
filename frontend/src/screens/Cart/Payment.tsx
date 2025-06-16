import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Pressable,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import React, {useState} from 'react';
import TopSection from '../../components/custom-components/TopSection';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import CartCustomButton from '../../components/custom-components/CartCustomButton';
import {Calendar} from 'react-native-calendars';

const Payment = ({navigation}: {navigation: NavigationProp<ParamListBase>}) => {
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [isChecked, setIsChecked] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [saveDetails, setSaveDetails] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selected, setSelected] = useState('DD-MM-YY');

  return (
    <View className="flex-1 p-4">
      <TopSection
        text={'Payment Method'}
        handleGoBack={() => navigation.goBack()}
      />

      {paymentMethod == 'online' ? (
        <View className="h-full">
          {/* Credit/Debit Card Form */}
          <View className="bg-gray-100 p-4 rounded-lg mb-4">
            <View className="flex-row space-x-4">
              <Icon name="wallet-outline" size={20} color={'black'} />
              <Text
                style={{fontFamily: 'Poppins-SemiBold'}}
                className="text-textColor">
                Credit/Debit Card
              </Text>
            </View>
            <Text
              className="text-sm my-2 mt-4 text-gray-700"
              style={{fontFamily: 'Poppins-Regular'}}>
              Card Number
            </Text>
            <TextInput
              className="bg-white border border-gray-300 rounded-md px-3 py-2 text-base mb-4"
              placeholder="1234 1234 1234 1234"
              keyboardType="numeric"
              value={cardNumber}
              onChangeText={setCardNumber}
            />

            <View className="flex-row justify-between">
              <View className="flex-1 mr-2">
                <Text
                  className="text-sm mb-2 text-gray-700"
                  style={{fontFamily: 'Poppins-Regular'}}>
                  Expiry
                </Text>
                <TextInput
                  className="bg-white border border-gray-300 rounded-md px-3 py-2 text-base"
                  placeholder="MM/YY"
                  value={expiry}
                  onChangeText={setExpiry}
                />
              </View>

              <View className="flex-1 ml-2">
                <Text
                  className="text-sm mb-2 text-gray-700"
                  style={{fontFamily: 'Poppins-Regular'}}>
                  CVC
                </Text>
                <TextInput
                  className="bg-white border border-gray-300 rounded-md px-3 py-2 text-base"
                  placeholder="XXXX"
                  keyboardType="numeric"
                  value={cvc}
                  onChangeText={setCvc}
                />
              </View>
            </View>

            {/* Save Details Checkbox */}
            <TouchableOpacity
              className="flex-row items-center space-x-3 mt-4"
              onPress={() => setIsChecked(!isChecked)}>
              <View
                className={`w-6 h-6 rounded-full border-2 border-gray-300 bg-white  flex items-center justify-center`}>
                {isChecked && <Icon name="checkmark" size={12} />}
              </View>
              <Text
                className="text-base"
                style={{fontFamily: 'Poppins-Regular'}}>
                Save Details
              </Text>
            </TouchableOpacity>

            {/* Get OTP Button */}
            <TouchableOpacity className="bg-gray-300 py-3 rounded-lg mt-4">
              <Text
                className="text-white text-base text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                Get OTP
              </Text>
            </TouchableOpacity>
          </View>

          {/* Other Payment Options */}
          <View>
            <TouchableOpacity className="flex-row items-center py-4 border-b border-gray-200">
              <Image
                source={require('../../../assets/icons/paypal.png')}
                className="w-6 h-6 mr-3"
              />
              <Text
                className="text-base"
                style={{fontFamily: 'Poppins-Regular'}}>
                PayPal
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center py-4 border-b border-gray-200">
              <Image
                source={require('../../../assets/icons/phonepay.png')}
                className="w-6 h-6 mr-3"
              />
              <Text
                className="text-base"
                style={{fontFamily: 'Poppins-Regular'}}>
                PhonePe
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center py-4 border-b border-gray-200">
              <Image
                source={require('../../../assets/icons/gpay.png')}
                className="w-6 h-6 mr-3"
              />
              <Text
                className="text-base"
                style={{fontFamily: 'Poppins-Regular'}}>
                Google Pay
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center py-4 border-b border-gray-200"
              onPress={() => setPaymentMethod('cod')}>
              <Image
                source={require('../../../assets/icons/codIcon.png')}
                className="w-6 h-6 mr-3"
              />
              <Text
                className="text-base"
                style={{fontFamily: 'Poppins-Regular'}}>
                Cash on Delivery
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-1" />
          <View className="w-[90%] mx-auto mb-12">
            <CartCustomButton
              text="confirm"
              onPressHandler={() => navigation.navigate('')}
            />
          </View>
        </View>
      ) : (
        <View className='h-full'>
          <View className="flex-row space-x-4 items-center mt-4">
            <View className="bg-Primary w-8 h-8 items-center justify-center rounded-full">
              <Icon name="checkmark" color={'white'} size={16} />
            </View>
            <Text
              className="text-lg text-textColor"
              style={{fontFamily: 'Poppins-SemiBold'}}>
              Cash On Delivery
            </Text>
          </View>
          <Text
            className="text-lg text-textColor mt-4"
            style={{fontFamily: 'Poppins-Medium'}}>
            Payment Date & Time :{' '}
          </Text>
          <View className="bg-gray-200 rounded-lg p-3 px-4 mt-4 flex-row space-x-4">
            <Pressable
              className=""
              onPress={() => setShowCalendar(!showCalendar)}>
              <Image
                source={require('../../../assets/icons/calender.png')}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </Pressable>
            <Text style={{fontFamily: 'Poppins-Regular'}}>{selected}</Text>
          </View>
          {showCalendar && (
            <Calendar
              onDayPress={(day: any) => {
                setSelected(day.dateString);
              }}
              markedDates={{
                [selected]: {
                  selected: true,
                  disableTouchEvent: true,
                },
              }}
            />
          )}

       <View className="bg-gray-200 rounded-lg px-4 flex-row space-x-4 items-center mt-4">
            <View
              className="">
              <Image
                source={require('../../../assets/icons/clock.png')}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </View>
            <TextInput placeholder='--:--' className='text-lg w-full' style={{letterSpacing : 3}}/>
          </View>
        <View className='flex-1'/>
        <View className="w-[90%] mx-auto mb-12">
            <CartCustomButton
              text="confirm"
              onPressHandler={() => navigation.navigate('')}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default Payment;
