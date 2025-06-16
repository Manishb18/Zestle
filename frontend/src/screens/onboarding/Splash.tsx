import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationProp } from '@react-navigation/native'

const Splash = ({navigation}: {navigation: NavigationProp<any>}) => {

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Signin')
    }, 2000)
  }, [])

  return (
    <View className='h-full'>
      <View className='flex justify-center items-center h-full'>
        <Image source={require('../../../assets/images/Freshli-Logo.png')} className=''/>
      </View>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({})