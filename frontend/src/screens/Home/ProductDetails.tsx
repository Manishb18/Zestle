import React, { useState, useMemo, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  NavigationProp,
  RouteProp,
  ParamListBase,
} from '@react-navigation/native';
import { baseUrl } from '../../utils/constants';
import colors from '../../utils/colors';
import fonts from '../../utils/fonts';

const TopSection = React.memo(({ handleGoBack }: { handleGoBack: () => void }) => {
  return (
    <View style={styles.topSection}>
      <View style={styles.topSectionInner}>
        <Pressable onPress={handleGoBack}>
          <Image source={require('../../../assets/icons/leftArrow.png')} />
        </Pressable>
        <Text style={styles.topSectionTitle}>Product Details</Text>
      </View>
    </View>
  );
});

const ProductSection = React.memo(({ item }: { item: any }) => {
  return (
    <View style={styles.productSection}>
      <View style={styles.productImageContainer}>
        <Image
          source={{ uri: `${baseUrl}/${item.image}` }}
          resizeMode="cover"
          style={styles.productImage}
        />
        <Image
          source={require('../../../assets/icons/heartIcon.png')}
          style={styles.heartIcon}
        />
      </View>
      <View style={styles.productDetails}>
        <View style={styles.nameAndRatings}>
          <Text style={styles.productName}>{item.name}</Text>
          <View style={styles.ratings}>
            <Image source={require('../../../assets/icons/Star.png')} style={styles.ratingIcon}/>
            <Image source={require('../../../assets/icons/Star.png')} style={styles.ratingIcon}/>
            <Image source={require('../../../assets/icons/Star.png')} style={styles.ratingIcon}/>
            <Image source={require('../../../assets/icons/Star.png')} style={styles.ratingIcon}/>
            <Image source={require('../../../assets/icons/HalfStar.png')} style={styles.ratingIcon}/>
          </View>
        </View>

        <View style={styles.quantityContainer}>
          <View style={styles.quantityInner}>
            <Text style={styles.weightText}>Weight</Text>
            <Pressable style={styles.quantityButton}>
              <Image source={require("../../../assets/icons/plusIcon.png")} />
            </Pressable>
            <Text style={styles.weightValue}>500 gr.</Text>
            <Pressable style={styles.quantityButton}>
              <Image source={require("../../../assets/icons/minusIcon.png")} />
            </Pressable>
          </View>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.totalPriceText}>Total Price</Text>
          <View style={styles.priceValueContainer}>
            <Text style={styles.priceValue}>${item.price}</Text>
          </View>
        </View>
      </View>
    </View>
  );
});

const DetailsSection = React.memo(({item} : {item: any}) => {
  const maxLines = 4;
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  const detailsTextStyle = useMemo(() => [
    styles.detailsText,
    !isExpanded && styles.detailsTextCollapsed
  ], [isExpanded]);

  return (
    <View style={styles.detailsSection}>
      <Text style={styles.detailsTitle}>Details</Text>
      <Text
        style={detailsTextStyle}
        numberOfLines={isExpanded ? undefined : maxLines}
      >
        {item.description}
      </Text>
      <TouchableOpacity onPress={toggleExpand}>
        <Text style={styles.readMoreText}>{isExpanded ? "Read Less" : "Read More"}</Text>
      </TouchableOpacity>
    </View>
  );
});

const DeliveryDetails = React.memo(() => {
  return (
    <View style={styles.deliveryDetails}>
      <Text style={styles.deliveryTitle}>Estimated delivery date : </Text>
      <Text style={styles.deliveryDate}>29-Nov-2024</Text>
    </View>
  );
});

const AddToCart = React.memo(() => {
  return (
    <TouchableOpacity style={styles.addToCartButton}>
      <Text style={styles.addToCartText}>Add to Cart</Text>
      <Image source={require("../../../assets/icons/cartIcon.png")} />
    </TouchableOpacity>
  );
});

const ProductDetails = ({
  route,
  navigation,
}: {
  route: RouteProp<ParamListBase>;
  navigation: NavigationProp<ParamListBase>;
}) => {
  const { Product } = route.params as { Product: any };
  
  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <TopSection handleGoBack={handleGoBack} />
      <ProductSection item={Product} />
      <DetailsSection item={Product} />
      <DeliveryDetails />
      <AddToCart />
    </ScrollView>
  );
};

export default React.memo(ProductDetails);

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  topSectionInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topSectionTitle: {
    fontFamily: fonts.semibold,
    fontSize: 18,
    color: '#4E424C',
    marginLeft: 16,
  },
  productSection: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 16,
    position: 'relative',
  },
  productImageContainer: {
    position: 'absolute',
    width: '130%',
    height: '130%',
    borderRadius: 9999,
    overflow: 'hidden',
    right: -256,
  },
  productImage: {
    width: '75%',
    height: '100%',
  },
  heartIcon: {
    position: 'absolute',
    left: 208,
    top: 16,
  },
  productDetails: {
    width: '100%',
    height: 384,
    // marginVertical: 12,
    gap: 36,
    marginLeft : 4,
    // justifyContent: 'space-between',
  },
  nameAndRatings: {
    marginTop: 16,
    // marginLeft : 12,
  },
  productName: {
    fontFamily: fonts.regular,
    color: colors.primary,
    fontSize: 24,
  },
  ratings: {
    flexDirection: 'row',
    marginVertical: 8,
    gap: 8,
  },
  ratingIcon: {
    width: 12,
    height: 12,
  },
  quantityContainer: {
    backgroundColor: colors.secondary,
    width: 96,
    height: 192,
    borderTopLeftRadius: 9999,
    borderBottomLeftRadius: 9999,
    borderBottomRightRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityInner: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical : 12,
    height: 160,
  },
  weightText: {
    color: '#FFFFFFBF',
    fontSize: 14,
    fontFamily: fonts.regular,
  },
  quantityButton: {
    alignItems: 'center',
  },
  weightValue: {
    color: 'white',
    fontSize: 20,
    fontFamily: fonts.semibold,
  },
  priceContainer: {
    marginTop: 32,
    gap: 8,
  },
  totalPriceText: {
    color: '#4E424C',
    fontFamily: fonts.regular,
  },
  priceValueContainer: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    width: 144,
    height: 40,
    borderTopLeftRadius: 9999,
    borderBottomLeftRadius: 9999,
    borderBottomRightRadius: 9999,
    borderTopRightRadius: 8,
  },
  priceValue: {
    color: 'white',
    fontSize: 20,
    fontFamily: fonts.semibold,
  },
  detailsSection: {
    marginTop: 96,
    marginHorizontal: 8,
  },
  detailsTitle: {
    color: '#4E424C',
    fontSize: 20,
      fontFamily: fonts.medium,
  },
  detailsText: {
    marginTop: 8,
    color: '#4E424C80',
    fontSize: 13,
    lineHeight: 20,
    width: '90%',
    textAlign: 'justify',
    fontFamily: fonts.regular,
  },
  detailsTextCollapsed: {
    height: 40,
    overflow: 'hidden',
  },
  readMoreText: {
    color: 'green',
  },
  deliveryDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
    marginHorizontal: 8,
  },
  deliveryTitle: {
    color: '#4E424C',
    fontSize: 20,
    lineHeight: 28,
    fontFamily: fonts.medium,
  },
  deliveryDate: {
    color: '#000000BF',
    fontFamily: fonts.regular,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    marginVertical: 32,
    marginHorizontal: 'auto',
    backgroundColor: colors.primary,
    borderRadius: 24,
    padding: 16,
  },
  addToCartText: {
    color: 'white',
    fontFamily: fonts.medium,
    marginRight: 8,
  },
});
