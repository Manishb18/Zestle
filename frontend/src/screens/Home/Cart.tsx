import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import TopSection from '../../components/custom-components/TopSection';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import CustomButton from '../../components/custom-components/CustomButton';
import CartCustomButton from '../../components/custom-components/CartCustomButton';
import NoShow from '../../components/custom-components/NoShow';
import colors from '../../utils/colors';
import fonts from '../../utils/fonts';
import EmptyCart from '../EmptyScreens/EmptyCart';

const Cart = ({ navigation }: { navigation: NavigationProp<ParamListBase> }) => {
  const [cart, setCart] = useState([
    {
      product: {
        name: 'Potatoes',
        price: '$25.00',
        image: 'path/to/potatoes_image.jpg', 
        weight: '500gms',
      },
      quantity: 1,
    },
    {
      product: {
        name: 'Tomatoes',
        price: '$15.00',
        image: 'path/to/tomatoes_image.jpg', 
        weight: '1kg',
      },
      quantity: 2,
    },
  ]);

  if (cart.length === 0) {
    return (
      <EmptyCart navigation={navigation}/>
    );
  }

  return (
    <View style={styles.container}>
      <TopSection text={'Cart'} handleGoBack={() => navigation.goBack()} />

      <View style={styles.header}>
        <Text style={styles.itemsText}>Items</Text>
        <Text>Remove all</Text>
      </View>

      {/* cart items */}
      <View style={styles.cartItemsContainer}>
        {cart.map((item, index) => (
          <View key={index} style={styles.cartItem}>
            <View style={styles.cartItemDetails}>
              <View style={styles.imagePlaceholder}>
                <Text>Image</Text>
              </View>

              <View>
                <Text style={styles.productName}>{item.product.name}</Text>
                <Text style={styles.productPrice}>{item.product.price}</Text>
                <Text style={styles.productWeight}>{item.product.weight}</Text>
              </View>
            </View>

            <View style={styles.quantityContainer}>
              <TouchableOpacity style={styles.quantityButton}>
                <Image source={require('../../../assets/icons/minusIcon.png')} />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity style={styles.quantityButton}>
                <Image source={require('../../../assets/icons/plusIcon.png')} />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={styles.addMoreContainer}>
          <Text>Add More</Text>
        </View>
      </View>

      {/* apply coupon section */}
      <View style={styles.couponSection}>
        <Text style={styles.couponText}>Apply coupons :</Text>
        <TextInput
          placeholder="Type"
          style={styles.couponInput}
        />
      </View>

      {/* price details */}
      <View style={styles.priceDetails}>
        <Text style={styles.totalText}>Total :</Text>
        <View style={styles.priceDetailContainer}>
          <View style={styles.priceDetailRow}>
            <Text style={styles.priceDetailLabel}>Price :</Text>
            <Text style={styles.priceDetailValue}>$40.0</Text>
          </View>
          <View style={styles.priceDetailRow}>
            <Text style={styles.priceDetailLabel}>Applied Coupon :</Text>
            <Text style={styles.couponValue}>- $10.0</Text>
          </View>
          <View style={styles.priceDetailRow}>
            <Text style={styles.priceDetailLabel}>Delivery Charge :</Text>
            <Text style={styles.priceDetailValue}>$15.0</Text>
          </View>
        </View>

        <View style={styles.separator} />
        <Text style={styles.totalAmount}>$45.00</Text>
      </View>

      <View style={styles.selectedItemsContainer}>
        <Text style={styles.selectedItemsText}>selected item ({cart.length})</Text>
        <CartCustomButton text='schedule timings' onPressHandler={() => navigation.navigate("Schedule")} />
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    flex: 1,
  },
  emptyCartContainer: {
    padding: 16,
    backgroundColor: 'white',
    flex: 1,
  },
  buttonContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  itemsText: {
    fontSize: 16, // Equivalent to text-base
    fontFamily: fonts.semibold,
  },
  cartItemsContainer: {
    marginTop: 28,
    gap : 12
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cartItemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap : 8
  },
  imagePlaceholder: {
    backgroundColor: 'gray',
    width: 80,
    height: 80,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productName: {
    color: colors.textPrimary, // Example Primary color
    fontFamily: fonts.medium,
  },
  productPrice: {
    fontSize: 14, // Equivalent to text-base
    color: colors.textColor, // Example textColor
    fontFamily: fonts.regular,
  },
  productWeight: {
    fontFamily: fonts.regular,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quantityButton: {
    backgroundColor: colors.primary, // Example textColor
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    color: colors.textPrimary,
    fontSize: 18, // Equivalent to text-lg
  },
  addMoreContainer: {
    alignSelf: 'flex-end',
  },
  couponSection: {
    marginTop: 32,
    gap: 16,
  },
  couponText: {
    fontFamily: fonts.semibold,
    fontSize: 16, // Equivalent to text-lg
  },
  couponInput: {
    backgroundColor: '#F0F1F2',
    borderRadius: 8,
    padding: 8,
    paddingHorizontal: 16,
    fontFamily: fonts.regular,
  },
  priceDetails: {
    marginTop: 32,
    gap: 8,
  },
  totalText: {
    fontFamily: fonts.semibold,
    fontSize: 16, // Equivalent to text-lg
  },
  priceDetailContainer: {
    gap: 8,
  },
  priceDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceDetailLabel: {
    fontFamily: fonts.regular,
    fontSize: 14, // Equivalent to text-base
    color: colors.textColor
  },
  priceDetailValue: {
    fontFamily: fonts.regular,
    fontSize: 14, // Equivalent to text-base
    color: colors.textColor, // Example textColor
  },
  couponValue: {
    fontFamily: fonts.regular,
    fontSize: 14, // Equivalent to text-base
    color: 'red',
  },
  separator: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
    marginTop: 8,
  },
  totalAmount: {
    fontFamily: fonts.regular,
    fontSize: 24, // Equivalent to text-2xl
    color: colors.textColor, // Example textColor
    alignSelf: 'flex-end',
  },
  selectedItemsContainer: {
    alignItems: 'center',
    marginTop: 'auto',
  },
  selectedItemsText: {
    textTransform: 'capitalize',
    color: '#4E424C80',
    marginBottom: 8,
  },
});
