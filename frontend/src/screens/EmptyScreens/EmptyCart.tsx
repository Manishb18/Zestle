import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TopSection from '../../components/custom-components/TopSection'
import NoShow from '../../components/custom-components/NoShow'
import CartCustomButton from '../../components/custom-components/CartCustomButton'
import { NavigationProp, ParamListBase } from '@react-navigation/native'

const EmptyCart = ({navigation} : {navigation : NavigationProp<ParamListBase>}) => {
  return (
    <View style={styles.emptyCartContainer}>
        <TopSection text={'Cart'} handleGoBack={() => navigation.goBack()} />
        <NoShow
          image={require("../../../assets/images/emptyScreens/emptyCart.png")}
          text='Empty Cart!'
          subText='You don’t have any orders, Freshliii is waiting for you!'
        />
        <View className='flex-1'/>
        <View style={styles.buttonContainer}>
          <CartCustomButton text={"Continue Shopping"} onPressHandler={() => navigation.navigate("Categories")} />
        </View>
      </View>
  )
}

export default EmptyCart

const styles = StyleSheet.create({
    emptyCartContainer: {
        padding: 16,
        backgroundColor: 'white',
        flex: 1,
      },
      buttonContainer: {
        width: '90%',
        alignSelf: 'center',
      },
})