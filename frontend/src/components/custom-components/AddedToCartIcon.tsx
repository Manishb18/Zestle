import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AddedToCartIcon = () => {
  return (
    <View className='w-10 h-10 bg-[#4D434CBF] rounded-xl items-center justify-center'>
      <Image source={require('../../../assets/images/tick.png')} resizeMode='contain' className='w-6 h-6'/>
    </View>
  )
}

export default AddedToCartIcon

const styles = StyleSheet.create({})