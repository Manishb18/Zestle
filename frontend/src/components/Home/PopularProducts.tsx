import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { navigationProp } from '../../types';
import SingleProductCard from './SingleProductCard';
import { DEVICE_WIDTH } from '../../utils/constants';

const Header = ({navigation}: {navigation: navigationProp}) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Popular Items</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Products')}>
        <Text style={styles.viewAllText}>View all</Text>
      </TouchableOpacity>
    </View>
  );
};

const PopularProducts = ({ popularProducts, navigation }: { popularProducts: any[], navigation: navigationProp }) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <FlatList
        data={popularProducts}
        renderItem={({ item }) => (
          <SingleProductCard item={item} navigation={navigation} />
        )}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        contentContainerStyle={styles.flatListContent}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

export default PopularProducts;

const styles = StyleSheet.create({
  container: {
    marginBottom: 60,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 8,
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
  flatListContent: {
    paddingHorizontal: DEVICE_WIDTH * 0.02, // Add some horizontal padding
  },
  row: {
    justifyContent: 'space-between', // This will evenly space the items in each row
    marginBottom: DEVICE_WIDTH * 0.02, // Add some vertical spacing between rows
  },
});
