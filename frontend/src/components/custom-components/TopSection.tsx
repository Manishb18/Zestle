import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React from 'react'

const TopSection = ({text, handleGoBack} : {text : String, handleGoBack : any}) => {
    return (
        <View className="flex-row justify-between items-center mt-2">
          <View className="flex-row items-center space-x-4">
            <Pressable onPress={handleGoBack}>
              <Image source={require('../../../assets/icons/leftArrow.png')} />
            </Pressable>
            <Text
              style={{fontFamily: 'Poppins-SemiBold'}}
              className="text-lg text-[#4E424C]">
              {text}
            </Text>
          </View>
        </View>
      );
}

export default TopSection

const styles = StyleSheet.create({})