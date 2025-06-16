import {View, Text, TouchableOpacity, FlatList, Image, StyleSheet} from 'react-native';
import React from 'react';
import { Category } from '../../redux/types/category';
import { baseUrl } from '../../utils/constants';
import { categoryColors } from '../../utils/colors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { AppDispatch } from '../../redux/store/store';
import { resetProducts, setFilters, setOffset } from '../../redux/features/products/productSlice';
import { useDispatch } from 'react-redux';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Categories = ({categories} : {categories : Category[]}) => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch<AppDispatch>();

  const handleCategoryClick = (category: Category) => {
    dispatch(setFilters({category : category.slug, price : '', rating : '', discount : '', sort : ''}));
    dispatch(setOffset(0));
    dispatch(resetProducts())
    navigation.navigate('Products', {addedCategory : true});
  };  

  const renderItem = ({item, index} : {item : Category, index: number}) => {
    const colorIndex = index % categoryColors.length;
    return (
      <TouchableOpacity 
        style={[styles.itemContainer, {backgroundColor: categoryColors[colorIndex]}]}
        onPress={() => handleCategoryClick(item)}
      >
        <Image source={{uri: `${baseUrl}/${item.image}`}} style={styles.itemImage}  />
        <Text style={styles.itemText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Categories</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Products', {addedCategory : false})}>
          <Text style={styles.viewAllText}>View all</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 12,
    marginTop: 16,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    color: '#4E424C',
    fontFamily: 'Poppins-SemiBold',
  },
  viewAllText: {
    fontSize: 12,
    color: '#4E424C80',
    fontFamily: 'Poppins-Regular',
  },
  itemContainer: {
    width : 96,
    height : 96,
    padding: 4,
    alignItems: 'center',
    borderRadius: 12,
    marginHorizontal: 8,
    justifyContent : "space-around"
  },
  itemText: {
    fontSize: 12,
    color: '#4E434D',
    fontFamily: 'Poppins-Regular',
    textTransform: 'uppercase',
  },
  itemImage: {
    width: 48,
    height: 48,
  },
  flatListContent: {
    marginLeft : 6,
    paddingVertical: 8,
  },
});
