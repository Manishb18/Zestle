import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState, useEffect, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SingleProductCard from '../../components/Home/SingleProductCard';
import { NavigationProp, ParamListBase, useRoute, RouteProp } from '@react-navigation/native';
import colors from '../../utils/colors';
import fonts from '../../utils/fonts';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import { fetchCategories } from '../../redux/features/categories/categorySlice';
import { fetchAllProducts } from '../../redux/features/products/productThunks';

type navprops = NavigationProp<ParamListBase>;

// Add this type definition
type CategoryRouteParams = {
  selectedCategory?: string;
};

const TopSection = ({ handleGoBack, categories, setSelectedCategory, selectedCategory }: { 
  handleGoBack: any, 
  categories: any[], 
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | undefined>>,
  selectedCategory: string | undefined
}) => {
  const [isFiltering, setIsFiltering] = useState(false);

  const handleToggleFiltering = () => {
    setIsFiltering(!isFiltering);
  };

  const handleCategorySelect = (categorySlug: string) => {
    setSelectedCategory(prevCategory => 
      prevCategory === categorySlug ? undefined : categorySlug
    );
    setIsFiltering(false);
  };

  return (
    <View style={styles.topSection}>
      <View style={styles.topSectionHeader}>
        <Pressable onPress={handleGoBack}>
          <Image source={require('../../../assets/icons/leftArrow.png')} />
        </Pressable>
        <Text style={[styles.headerText, { fontFamily: fonts.semibold }]}>
          Categories
        </Text>
      </View>
      {isFiltering && (
        <View style={styles.filterMenu}>
          {categories.map(category => (
            <Pressable 
              key={category.id} 
              style={[
                styles.filterItem,
                selectedCategory === category.slug && styles.selectedFilterItem
              ]}
              onPress={() => handleCategorySelect(category.slug)}
            >
              <Text style={styles.filterText}>{category.name}</Text>
            </Pressable>
          ))}
        </View>
      )}
      {isFiltering ? (
        <Pressable style={styles.closeButton} onPress={handleToggleFiltering}>
          <Image source={require("../../../assets/icons/wrong.png")} />
        </Pressable>
      ) : (
        <Pressable onPress={handleToggleFiltering}>
          <Image source={require('../../../assets/icons/filterIcon.png')} />
        </Pressable>
      )}
    </View>
  );
};

const CategorySection = ({ category, navigation }: { category: any, navigation: navprops }) => {
  const [viewAll, setViewAll] = useState(false);
  const allProducts = useSelector((state: RootState) => state.product.products);

  const products = useMemo(() => 
    allProducts.filter(product => product.category.slug === category.slug),
    [allProducts, category.slug]
  );

  const displayedProducts = useMemo(() => 
    viewAll ? products : products.slice(0, 2),
    [viewAll, products]
  );

  const handleViewAll = () => {
    setViewAll(!viewAll);
  };

  if(products.length === 0) {
    return (
      <View style={styles.noProductsContainer}>
        <Text style={styles.noProductsText}>No products available in this category</Text>
      </View>
    );
  }

  return (
    <View style={{marginBottom : 12}}>
      <View style={[styles.headerContainer, {marginTop: 12}]}>
        <Text style={[styles.headerText, { fontFamily: fonts.medium }]}>
          {category.name}
        </Text>
        <View style={styles.viewAllContainer}>
          {viewAll ? (
            <Image source={require('../../../assets/icons/arrowDownward.png')} />
          ) : (
            <Image source={require('../../../assets/icons/arrowForward.png')} />
          )}
          <TouchableOpacity onPress={handleViewAll}>
            <Text>View all</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={displayedProducts}
        renderItem={({ item }) => (
          <SingleProductCard item={item} navigation={navigation} />
        )}
        keyExtractor={item => item.id}
        numColumns={2}
      />
    </View>
  );
};

const OfferCard = () => {
  return (
    <View style={styles.offerCard}>
      <ImageBackground
        source={require('../../../assets/images/categories/offerCard.png')}
        style={styles.offerCardBackground}
        resizeMode="cover"
      >
        <Text style={[styles.offerDetails, { fontFamily: fonts.medium }]}>
          Get 30% off on your first order
        </Text>
       
      </ImageBackground>
    </View>
  );
};

const Categories = ({ navigation }: { navigation: navprops }) => {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector((state: RootState) => state.category.categories);
  const loading = useSelector((state: RootState) => state.category.loading || state.product.loading);
  const route = useRoute<RouteProp<Record<string, CategoryRouteParams>, string>>();
  const initialCategory = route.params?.selectedCategory;
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(initialCategory);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchAllProducts({}));
  }, [dispatch]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const filteredCategories = useMemo(() => 
    selectedCategory
      ? categories.filter(category => category.slug === selectedCategory)
      : categories,
    [categories, selectedCategory]
  );

  const categorySections = useMemo(() => 
    filteredCategories.map((category, index) => (
      <React.Fragment key={category.id}>
        <CategorySection category={category} navigation={navigation} />
        {index === 0 && !selectedCategory && <OfferCard />}
      </React.Fragment>
    )),
    [filteredCategories, navigation, selectedCategory]
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <TopSection 
          handleGoBack={handleGoBack} 
          categories={categories}
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
        {categorySections}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
    height : "100%",
  },
  scrollView: {
    padding: 16,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    color: colors.textPrimary,
    marginLeft: 10,
    textTransform : "capitalize",
  },
  filterMenu: {
    position: 'absolute',
    right : 10,
    top:32,
    backgroundColor: colors.primary,
    justifyContent: 'space-between',
    zIndex : 1,
    borderRadius : 10,
    width : "33%",
  },
  filterItem: {
    padding: 10,
    borderBottomColor : "white",
    borderBottomWidth : 0.5,
  },  
  filterText: {
    fontSize: 16,
    color: "white",
  },
  closeButton: {
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 10,
  },
  viewAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  offerCard: {
    marginVertical: 16,
  },
  offerCardBackground: {
    width: '100%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  offerDetails: {
    color: colors.textColor,
    width : "50%",
    marginRight : "auto",
    marginLeft : 20,
    fontSize: 18,
  },
  selectedFilterItem: {
    backgroundColor: colors.secondary,
  },
  noProductsContainer: {
    marginTop: 12,
    alignItems: "center",
  },
  noProductsText: {
    fontSize: 18,
    fontFamily: fonts.semibold,
  },
});
export default Categories;
