import {ScrollView, StyleSheet, Text, View, Image, Pressable} from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, { useEffect, useCallback, useMemo } from 'react';
import CartIcon from '../../components/custom-components/CartIcon';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import { User } from '../../redux/types/user';
import Categories from '../../components/Home/Categories';
import ProductCards from '../../components/Home/ProductCards';
import PopularProducts from '../../components/Home/PopularProducts';
import { fetchPopularProducts } from '../../redux/features/products/productThunks';
import { fetchCategories } from '../../redux/features/categories/categorySlice';
import { fetchBanners } from '../../redux/features/banners/bannerSlice';
import Banners from '../../components/Home/Banners';

const TopSection = ({user, handleSearchClick, handleProfileClick, navigation} : {user : User | null, handleSearchClick : ()=>void, handleProfileClick : ()=>void, navigation: NavigationProp<ParamListBase>}) => {
  return (
    <View style={styles.topBar}>
      <View style={styles.userSection}>
        <Pressable style={styles.profileImageContainer} onPress={handleProfileClick}>
          <Image
            source={require('../../../assets/images/UserProfile.png')}
            style={styles.profileImage}
            resizeMode='contain'
          />
        </Pressable>

        <Text style={styles.welcomeText}>
          Hi {user?.name}
        </Text>
      </View>
      <View style={styles.iconSection}>
        <Pressable onPress={handleSearchClick}>
          <Image source={require('../../../assets/icons/searchIcon.png')} resizeMode='cover' style={styles.searchIcon}/>
        </Pressable>
        <Pressable style={styles.cartIconContainer} onPress={()=>navigation.navigate("Cart")}>
          <CartIcon />
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>2</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const OrderBannerSection = () => {
  return (
    <View style={styles.orderBanner}>
      <Text style={styles.orderText}>
        Order By <Text style={styles.orderTime}>11 PM TODAY</Text>
      </Text>
      <View style={styles.deliveryInfo}>
        <Text style={styles.deliveryText}>
          <Text style={styles.deliveryTime}>GET BY 7 AM</Text> Tomorrow
        </Text>
        <Image
          source={require('../../../assets/images/truckImage.png')}
          style={styles.truckImage}
        />
      </View>
    </View>
  );
};

const Home = ({ navigation }: { navigation: NavigationProp<ParamListBase> }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const { popularProducts } = useSelector((state: RootState) => state.product);
  const { categories } = useSelector((state: RootState) => state.category);
  const { banners } = useSelector((state: RootState) => state.banner);

  useEffect(() => {
    console.log("fetching popular products");
    dispatch(fetchPopularProducts());
    dispatch(fetchCategories());
    dispatch(fetchBanners());
  }, [dispatch]);

  const handleSearchClick = useCallback(() => {
    navigation.navigate("Search");
  }, [navigation]);

  const handleCategoryClick = useCallback(() => {
    navigation.navigate("Categories");
  }, [navigation]);

  const handleProfileClick = useCallback(() => {
    navigation.navigate("Profile");
  }, [navigation]);

  // Memoize the PopularProducts component
  const MemoizedPopularProducts = useMemo(() => {
    return <PopularProducts popularProducts={popularProducts} navigation={navigation} />;
  }, [popularProducts, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <TopSection 
          user={user} 
          handleSearchClick={handleSearchClick} 
          handleProfileClick={handleProfileClick} 
          navigation={navigation}
        />
        <OrderBannerSection />
        <Categories categories={categories} />
        <Banners navigation={navigation} banners={banners}/>
        {MemoizedPopularProducts}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // padding: 16,
    height: '100%',
  },
  scrollContent: {
    flexGrow: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    padding : 12
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  profileImageContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#E5E7EB',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  welcomeText: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: 'black',
  },
  iconSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  searchIcon: {
    width: 24,
    height: 24,
  },
  cartIconContainer: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  orderBanner: {
    // flex: 1,
    marginTop: 16,
    marginLeft: 12,
  },
  orderText: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: 'black',
  },
  orderTime: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#4CAF50',
  },
  deliveryInfo: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
  deliveryText: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: 'black',
  },
  deliveryTime: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    textTransform: 'uppercase',
  },
  truckImage: {
    marginTop: -16,
    marginLeft: 16,
  },
});
