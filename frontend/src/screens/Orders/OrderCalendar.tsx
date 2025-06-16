import {
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import TopSection from '../../components/custom-components/TopSection';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {CalendarList} from 'react-native-calendars';

const OrderCalendar = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  const [orders, setOrders] = useState([
    {
      image: '../../../assets/images/PopularItems/tomatoes.png', // Replace with the actual image path
      name: 'Tomatoes',
      quantity: '1kg',
      price: 25.0,
    },
    {
      image: '../../../assets/images/PopularItems/tomatoes.png', // Replace with the actual image path
      name: 'Potatoes',
      quantity: '1kg',
      price: 55.0,
    },
  ]);

  const [dateChanged, setDateChanged] = useState(false);

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0],
  );

  const handleDateChange = (day: any) => {
    setDateChanged(!dateChanged);
    setSelectedDate(day.dateString);
  };

  return (
    <View className="bg-white h-full">
      <View className="mt-4 ml-4">
        <TopSection
          text={'Ordered Slots'}
          handleGoBack={() => navigation.goBack()}
        />
      </View>
      <CalendarList
        // Horizontal scrolling
        horizontal
        pagingEnabled
        onDayPress={day => {
          handleDateChange(day); // Update the selected date on day press
        }}
        renderHeader={date => {
          const formattedMonth = new Date(date).toLocaleDateString('en-US', {
            month: 'short', // Use 'short' for abbreviated month name (e.g., Jan, Feb)
            year: 'numeric', // Display the year
          });
          return (
            <Text style={styles.monthText} className="text-3xl w-full mt-4">
              {formattedMonth}
            </Text>
          );
        }}
        theme={{
          calendarBackground: 'white',
          textSectionTitleColor: '#8B8787', // Days of the week
          textMonthFontWeight: 'bold',
          textMonthFontSize: 20, // Adjust month font size
          textDayFontSize: 16,
          selectedDayBackgroundColor: '#4CAF50',
          selectedDayTextColor: 'white',
          textDayFontWeight: 'normal',
          todayTextColor: '#4CAF50', // Green color for today if necessary
          dayTextColor: '#4B4B4B', // General day color
          monthTextColor: '#4B4B4B', // Month name color
          textDayFontFamily: 'Poppins-Regular',
          textDayHeaderFontFamily: 'Poppins-Regular',
        }}
        markedDates={{
          [selectedDate]: {
            selected: true,
            marked: true,
            selectedColor: '#4CAF50', // Green circle for the 15th
            selectedTextColor: 'white', // Text color for the selected date
          },
        }}
        firstDay={1} // Monday as the first day of the week
        pastScrollRange={12} // 12 months back
        futureScrollRange={12} // 12 months forward
        showScrollIndicator={false} // Hide scroll bar
      />

      <View
        className="border-b border-black w-[90%] mx-auto"
        style={{borderBottomWidth: 0.5}}></View>

      {dateChanged ? (
        <View>
          {/* Noorder  */}
          <View className="mx-auto mt-4 items-center justify-center">
            <Image
              source={require('../../../assets/images/orders/noOrder.png')}
              resizeMode="cover"
            />
          </View>

          <TouchableOpacity className="bg-Primary w-36 h-12 rounded-3xl p-2 items-center justify-center mx-auto mt-4">
            <Text
              style={{fontFamily: 'Poppins-Regular', letterSpacing: 2}}
              className="text-white text-base">
              Add More
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="space-y-8 m-4 mt-8">
        {orders.map((item, index) => (
          <View className="flex-row justify-between">
            <View className="flex-row space-x-4 items-center">
              <View className="bg-gray-200 w-20 h-20 rounded-lg">
                <Text>Image</Text>
              </View>

              <View className="">
                <Text
                  className=" text-textColor text-lg"
                  style={{fontFamily: 'Poppins-Medium'}}>
                  {item.name}
                </Text>
                <Text style={{fontFamily: 'Poppins-Regular'}} className='text-textColor'>
                {item.quantity}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center">
              <Text className="text-textColor text-lg" style={{fontFamily: 'Poppins-SemiBold'}}>${item.price}</Text>
            </View>
          </View>
        ))}

        <View className='border-2 border-Primary w-1/3 rounded-full items-center p-2 mx-auto'>
        <Text className='text-Primary' style = {{fontFamily : "Poppins-Medium", letterSpacing : 2}}>ADD MORE</Text>
        </View>
      </View>
      )}
    </View>
  );
};

export default OrderCalendar;

const styles = StyleSheet.create({
  monthText: {
    fontFamily: 'Poppins-Regular',
    paddingVertical: 16,
    color: '#4B4B4B',
  },
});
