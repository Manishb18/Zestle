import React, { memo } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AddedToCartIcon from '../custom-components/AddedToCartIcon';
import CartIcon from '../custom-components/CartIcon';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import { baseUrl, DEVICE_WIDTH } from '../../utils/constants';
import fonts from '../../utils/fonts';

const SingleProductCard = memo(({
  item,
  navigation,
}: {
  item: any;
  navigation: NavigationProp<ParamListBase>;
}) => {
  const handleProductClick = () => {
    navigation.navigate("Product", {"Product": item});
  }

  return (
    <Pressable onPress={handleProductClick} style={styles.mainContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: `${baseUrl}/${item.image}`}}
          style={styles.image}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.cartIconContainer}>
          {item.addedToCart ? <AddedToCartIcon /> : <CartIcon />}
        </TouchableOpacity>
        <LinearGradient
          colors={[
            'rgba(77, 67, 76, 0.15)',
            'rgba(77, 67, 76, 0.75)',
          ]}
          style={styles.gradient}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
        >
          <Text style={styles.productName}>
            {item.name}
          </Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              ${item.price}
            </Text>
            <Text style={styles.basis}>per {item.units}</Text>
          </View>
        </LinearGradient>
      </View>
    </Pressable>
  );
});

export default SingleProductCard;

const styles = StyleSheet.create({
  mainContainer: {
    width: DEVICE_WIDTH * 0.45,
    height: DEVICE_WIDTH * 0.45,
    margin: DEVICE_WIDTH * 0.01,
    borderRadius: 12,
    shadowColor: '#4E424C',
    shadowOffset: {
      width: 0,
      height: 4, 
    },
    shadowOpacity: 0.5, 
    shadowRadius: 16,
    elevation: 5, 
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  cartIconContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
  },

  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
  },
  productName: {
    color: 'white',
    fontFamily: fonts.medium,
    fontSize: 14,
    textTransform: 'capitalize',
  },
  priceContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    // marginTop: 4,
  },
  price: {
    fontFamily: 'Poppins-Bold',
    color: 'white',
    fontSize: 18,
    marginRight: 8,
  },
  basis: {
    color: 'white',
    fontSize: 12,
  },
});
