import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import TopSection from '../../components/custom-components/TopSection';
import {navigationProp} from '../../types';
import NoShow from '../../components/custom-components/NoShow';
import EmptyNotifications from '../EmptyScreens/EmptyNotifications';

const notifications = [
  {
    title: "Order #345",
    description: "Your Order is Confirmed. Please check everything is okay.",
    image: "🟢",
    time: "3:57 PM"
  },
  {
    title: "Order #345",
    description: "Your Order is Delivering to your home.",
    image: "📞",
    time: "2:33 PM"
  },
  {
    title: "Order #345",
    description: "Your Order is Canceled. Please check it.",
    image: "❌",
    time: "4:12 AM"
  },
  {
    title: "Order #345",
    description: "Your Order is Completed. Please rate the experience.",
    image: "⭐",
    time: "12:07 AM"
  },
  {
    title: "Voucher",
    description: "Get rewards up to $5 on your order on $15.",
    image: "💵",
    time: "7:07 PM"
  },
  {
    title: "Offer",
    description: "Grab your 50% off on your first 3 orders.",
    image: "🛍️",
    time: "10:07 AM"
  }
];

const Notifications = ({navigation}: {navigation: navigationProp}) => {

  if(!notifications || notifications.length == 0){
    return(
      <View style={styles.container}>
        <TopSection
          text={'Notifications'}
          handleGoBack={() => navigation.goBack()}
        />
       <NoShow image={require("../../../assets/images/emptyScreens/noNotifications.png")} text='No Notifications!' subText='You don’t have any notifications, Freshliii is waiting for you!'/>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <TopSection
        text={'Notifications'}
        handleGoBack={() => navigation.goBack()}
      />
      {notifications.length === 0 ?
      <EmptyNotifications/>
      :
      <View style={styles.notificationList}>
        {notifications.map((item, index) => (
          <View key={index} style={styles.notificationItem}>
            <View style={styles.notificationTextContainer}>
              <Text style={styles.notificationTitle}>{item.title}</Text>
              <Text style={styles.notificationDescription}>{item.description}</Text>
            </View>
            <View style={styles.notificationDetails}>
              <Text style={styles.notificationTime}>{item.time}</Text>
              <Text>{item.image}</Text>
            </View>
          </View>
        ))}
      </View>
    }
    </View>
  );
}


export default Notifications;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 16,
  },
  notificationList: {
    marginHorizontal: 8,
    marginTop: 32,
    gap: 4,
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationTextContainer: {
    width: '66%',
  },
  notificationTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#4E424C',
  },
  notificationDescription: {
    fontFamily: 'Poppins-Regular',
    color: '#4E424C',
  },
  notificationDetails: {
    alignItems: 'center',
    gap: 2,
  },
  notificationTime: {
    fontSize: 12,
  },
});
