import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TopSection from '../../components/custom-components/TopSection'
import NoShow from '../../components/custom-components/NoShow'

const EmptyNotifications = () => {
  return (
    <View>
       <NoShow image={require("../../../assets/images/emptyScreens/noNotifications.png")} text='No Notifications!' subText='You don’t have any notifications, Freshliii is waiting for you!'/>
    </View>
  )
}

export default EmptyNotifications

const styles = StyleSheet.create({
})