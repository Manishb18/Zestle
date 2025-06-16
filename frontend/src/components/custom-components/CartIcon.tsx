import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CartIcon = () => {
  return (
    <View className='bg-textPrimary rounded-2xl p-2 shadow-xl shadow-green-500 w-10 h-10 items-center'>
      <Image source={require('../../../assets/images/cartIcon.png')} className='' />
    </View>
  )
}

export default CartIcon

const styles = StyleSheet.create({})