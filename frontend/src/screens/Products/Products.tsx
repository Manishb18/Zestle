import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {memo, useEffect, useRef, useState, useCallback} from 'react';
import TopSection from '../../components/custom-components/TopSection';
import {
  ParamListBase,
  NavigationProp,
  useFocusEffect,
} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store/store';
import ProductCard from './ProductCard';
import {fetchAllProducts} from '../../redux/features/products/productThunks';
import {
  setOffset,
  resetProducts,
  setHideTabBar,
  setFilters,
  setSearchString,
} from '../../redux/features/products/productSlice';
import FilterModal from './FilterModal';
import colors from '../../utils/colors';

const FilterIcon = require('../../../assets/icons/filterIcon.png');

const Products = memo(({navigation}: {navigation: NavigationProp<ParamListBase>}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [searchText, setSearchText] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const searchTimeout = useRef<NodeJS.Timeout>();
    const {
      products,
      offset,
      loading,
      hasMore,
      hideTabBar,
      error,
      filters,
      searchString,
    } = useSelector((state: RootState) => state.product);
    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

    useFocusEffect(
      useCallback(() => {
        //code to run when the screen is focused (mounted or returned to)
        dispatch(setHideTabBar(false));
        return () => {
          //clean up code to run when the screen is unfocused (unmounted or navigated away from)
          dispatch(
            setFilters({
              category: '',
              price: '',
              rating: '',
              discount: '',
              sort: '',
            }),
          );
          dispatch(setOffset(0));
          dispatch(resetProducts());
        };
      }, []),
    );

    useEffect(() => {
      dispatch(
        fetchAllProducts({
          offset: 0,
          limit: 6,
          query: searchString,
          filters: filters,
        }),
      );
    }, [dispatch, searchString, filters]);

    //function to load more products
    const handleLoadMore = async () => {
      if (!loading && hasMore) {
        await dispatch(
          fetchAllProducts({
            offset: offset,
            limit: 6,
            query: searchString,
            filters: filters,
          }),
        );
      }
    };

    // Function to handle refreshing (resetting products and fetching again)
    const handleRefresh = async () => {
      setRefreshing(true); // Set refreshing to true
      dispatch(resetProducts()); // Reset the products in the Redux state
      await dispatch(
        fetchAllProducts({
          offset: 0,
          limit: 6,
          query: searchString,
          filters: filters,
        }),
      ); // Fetch the first set of products again
      setRefreshing(false); // Set refreshing to false
    };

    const renderFooter = () => {
      if (loading && products.length !== 0) {
        return <ActivityIndicator size="large" color="#0000ff" />;
      }
      if (error) {
        return <Text>Error: {error}</Text>;
      }
      return null;
    };

    const handleSearchChange = (text: string) => {
      setSearchText(text);

      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }

      searchTimeout.current = setTimeout(() => {
        dispatch(resetProducts());
        dispatch(setOffset(0));
        dispatch(setSearchString(text));
      }, 500);
    };

    const handleApplyFilters = (filters: any) => {
      dispatch(setFilters(filters));
      dispatch(setOffset(0));
      dispatch(resetProducts());
      // Apply the filters to your product list
    };

    return (
      <View style={styles.container}>
        <View style={styles.topSection}>
          <TopSection
            text={'Products'}
            handleGoBack={() => navigation.goBack()}
          />

          <Pressable
            style={styles.filterIcon}
            onPress={() => {
              dispatch(setHideTabBar(!hideTabBar));
              setIsFilterModalVisible(true);
            }}>
            <Image source={FilterIcon} />
          </Pressable>
        </View>
        <View style={styles.searchContainer}>
          <Image
            source={require('../../../assets/icons/searchIcon.png')}
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search Products"
            placeholderTextColor={'#4E424C80'}
            style={styles.searchInput}
            value={searchText}
            onChangeText={handleSearchChange}
          />
        </View>

        {filters.category && (
          <View style={styles.categoryContainer}>
            <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 16}}>
              Showing "{filters.category.toUpperCase()}"
            </Text>
          </View>
        )}
        {loading && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
        )}

        {!loading && products.length > 0 ? (
          <View style={styles.listContainer}>
            <FlatList
              data={products}
              renderItem={({item}) => (
                <ProductCard product={item} navigation={navigation} />
              )}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={renderFooter}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.5}
              contentContainerStyle={styles.flatListContentContainer}
              style={styles.flatListContainer}
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />

            
          </View>
        ) : (
          !loading && (<View
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 16}}>
              No products found
            </Text>
          </View>)
        )}
        <FilterModal
              visible={isFilterModalVisible}
              onClose={() => {
                dispatch(setHideTabBar(false));
                setIsFilterModalVisible(false);
              }}
              onApply={handleApplyFilters}
            />
      </View>
    );
  },
);

export default Products;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom: 50,
  },
  listContainer: {
    flex: 1,
  },
  topSection: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 'auto',
    backgroundColor: '#e8ecef',
    borderRadius: 8,
    marginBottom: 12,
  },
  categoryContainer: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  flatListContainer: {
    width: '95%',
    marginHorizontal: 'auto',
  },
  flatListContentContainer: {
    // paddingBottom: 16,
  },
  searchIcon: {
    marginHorizontal: 16,
  },
  searchInput: {
    fontSize: 14,
    width: '100%',
  },
  filterIcon: {},
  loader: {
    marginVertical: 16,
    alignItems: 'center',
  },
  filterButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 30,
    elevation: 5,
  },
});
