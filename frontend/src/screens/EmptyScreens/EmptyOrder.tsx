import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CartCustomButton from '../../components/custom-components/CartCustomButton';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

const EmptyOrder = ({ navigation }: { navigation: NavigationProp<ParamListBase> }) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={require("../../../assets/images/emptyScreens/emptyOrders.png")} resizeMode='cover' />
        <Text style={styles.title}>No Orders!</Text>
        <Text style={styles.subtitle}>You don’t have any orders, Freshliii is waiting for you!</Text>
      </View>
      <View style={styles.buttonContainer}>
        <CartCustomButton text={"Continue Shopping"} onPressHandler={() => navigation.navigate("Categories")} />
      </View>
    </View>
  );
}

export default EmptyOrder;

const styles = StyleSheet.create({
  container: {
    height:"100%",
    justifyContent: 'center',
  },
  innerContainer: {
    marginVertical: 'auto',
    marginHorizontal: 'auto',
    alignItems: 'center',
    width: '66.67%', 
    gap: 8, 
  },
  title: {
    fontSize: 20,
    color: '#4E434D', 
    fontFamily: 'Poppins-Bold',
  },
  subtitle: {
    color: '#4E434DBF',
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  buttonContainer: {
    width: '90%',
    marginHorizontal: 'auto',
  },
});
