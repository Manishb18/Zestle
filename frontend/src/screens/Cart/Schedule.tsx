import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import TopSection from '../../components/custom-components/TopSection';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import CartCustomButton from '../../components/custom-components/CartCustomButton';
import {Calendar} from 'react-native-calendars';

const Schedule = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selected, setSelected] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTIme, setSelectedTIme] = useState('pm');

  return (
    <View className="p-4 bg-white h-full">
      <TopSection
        text={'Schedule Timings'}
        handleGoBack={() => navigation.goBack()}
      />
      <View className="space-y-4 mt-4 h-full">
        <Text
          style={{fontFamily: 'Poppins-Medium'}}
          className="text-textColor text-lg">
          Expected Date & Time :
        </Text>
        <View className="bg-gray-100 rounded-lg p-4 flex-row justify-between">
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

        <View className='flex-row justify-between w-2/4 space-x-2 mx-auto'>
          <Pressable className={`${selectedTIme == "am" ? 'bg-Primary ' : 'bg-gray-200'} p-2 rounded-lg w-24 items-center`} onPress={()=>setSelectedTIme("am")}>
            <Text className={`${selectedTIme == "am" ? 'text-white' : 'text-textColor'}`}>8 AM</Text>
          </Pressable>
          <Pressable className={`${selectedTIme == "pm" ? 'bg-Primary' : 'bg-gray-20'} p-2 rounded-lg w-24 items-center`} onPress={()=>setSelectedTIme("pm")}>
            <Text className={`${selectedTIme == "pm" ? 'text-white' : 'text-textColor'}`}>8 PM</Text>
          </Pressable>
        </View>
        <View className='flex-1'></View>
        <View className='w-2/3 mx-auto mb-12'>
         <CartCustomButton text='checkout' onPressHandler={()=>navigation.navigate("Checkout")}/>
        </View>
      </View>
    </View>
  );
};

export default Schedule;

const styles = StyleSheet.create({});
