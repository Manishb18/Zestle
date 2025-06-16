import React from 'react';
import { StyleSheet, Text, View, Image, Pressable, TouchableOpacity } from 'react-native';
import { baseUrl } from '../../utils/constants';
import { NavigationProp, ParamListBase} from '@react-navigation/native';
import colors from '../../utils/colors';
import fonts from '../../utils/fonts';
import { setHideTabBar } from '../../redux/features/products/productSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store/store';

const ProductCard = ({ product, navigation }: { product: any; navigation: NavigationProp<ParamListBase>  }) => {
const dispatch = useDispatch<AppDispatch>();
  return (
    <Pressable 
      onPress={() => {
        navigation.navigate('Product', {Product: product});
        dispatch(setHideTabBar(true));
      }} 
      style={styles.container}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: `${baseUrl}/${product.image}` }} style={styles.image} />
      </View>
      <View style={styles.details}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <TouchableOpacity 
            style={styles.addButton}
            // onPress={() => onAddToCart(product)}
          >
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.04)',
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 8,
    // overflow: 'hidden',
    marginRight: 16,
    shadowColor: '#4E424C',
    shadowOffset: { width: 12, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 48,
    elevation: 12,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  details: {
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.semibold,
    color: colors.secondary,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: colors.secondary,
    fontFamily: fonts.regular,
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  addButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 4,
    borderRadius: 32,
  },
  addButtonText: {
    color: colors.primary,
    fontFamily: fonts.semibold,
    fontSize: 14,
  },
});
