import { StyleSheet, Text, View, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import React from 'react'
interface CartCustomButtonProps extends TouchableOpacityProps {
    text: string;
    onPressHandler: () => void;
  }
const CartCustomButton = ({text, onPressHandler} : CartCustomButtonProps) => {
  return (
    <TouchableOpacity className='bg-Primary rounded-2xl p-3 items-center justify-center px-8' onPress={onPressHandler}>
          <Text className='text-white uppercase text-base' style={{fontFamily : "Poppins-Medium", letterSpacing : 4}}>{text}</Text>
    </TouchableOpacity>
  )
}

export default CartCustomButton

const styles = StyleSheet.create({})