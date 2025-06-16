import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NoShow from '../../components/custom-components/NoShow'

const EmptyReviews = () => {
  return (
    <View>
        <NoShow image={require("../../../assets/images/emptyScreens/noReviews.png")} text='No Reviews Found!' subText='You don’t have any notifications, Freshliii is waiting for you!'/>
      </View>
  )
}

export default EmptyReviews

const styles = StyleSheet.create({})