import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {navigationProp} from '../../types';
import TopSection from '../../components/custom-components/TopSection';

// const TopSection = ({handleGoBack}: {handleGoBack: any}) => {
//   return (
//     <View className="flex-row justify-between items-center mt-2">
//       <View className="flex-row items-center space-x-4">
//         <Pressable onPress={handleGoBack}>
//           <Image source={require('../../../assets/icons/leftArrow.png')} />
//         </Pressable>
//         <Text
//           style={{fontFamily: 'Poppins-SemiBold'}}
//           className="text-lg text-[#4E424C]">
//           Wishlist
//         </Text>
//       </View>
//     </View>
//   );
// };

const EmptyWishlist = () => {
  return (
    <View className="items-center h-full justify-evenly">
      <View className="items-center space-y-2">
        <Image source={require('../../../assets/images/wishlistEmpty.png')} />
        <Text
          className="capitalize text-2xl text-black"
          style={{fontFamily: 'Poppins-SemiBold'}}>
          Your wishlist is empty
        </Text>
      </View>
      <TouchableOpacity className="flex-row w-[90%] items-center justify-center mt-24 bg-Primary rounded-3xl p-4">
        <Text
          className="text-white uppercase"
          style={{fontFamily: 'Poppins-Medium'}}>
          Add to wishlist
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Favorites = ({navigation}: {navigation: navigationProp}) => {
  const [items, setItems] = useState([
    {
      id: '1',
      name: 'Oranges',
      image: require('../../../assets/images/PopularItems/oranges.png'),
      price: '55.0',
      basis: '50 lbs',
      addedToCart: false,
    },
    {
      id: '2',
      name: 'Cauliflower',
      image: require('../../../assets/images/PopularItems/cauliflower.png'),
      price: '5.90',
      basis: 'Each',
      addedToCart: false,
    },
    {
      id: '3',
      name: 'Berries',
      image: require('../../../assets/images/PopularItems/berries.png'),
      price: '23.90',
      basis: '50 lbs',
      addedToCart: false,
    },
    {
      id: '4',
      name: 'Tomatoes',
      image: require('../../../assets/images/PopularItems/tomatoes.png'),
      price: '55.0',
      basis: '50 lbs',
      addedToCart: false,
    },
  ]);

  const [searchText, setsearchText] = useState();
  const handleSearchChange = (e: any) => {
    setsearchText(e.target.value);
  };

  const handleDelete = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleGoBack = () => {
    navigation.goBack();
  };
  return (
    <View className="p-2">
      <TopSection text={'Wishlist'} handleGoBack={handleGoBack} />
      {!items || items.length == 0 ? (
        <EmptyWishlist />
      ) : (
        <View className="mt-8 space-y-4">
          {items.map((item, index) => (
            <View
              className={`${
                index != items.length - 1 && 'border-b border-black'
              } w-full flex-row justify-between items-center py-2`}
              style={{borderBottomWidth: index !== items.length - 1 ? 0.5 : 0}}>
              <View className="flex-row space-x-2 items-center">
                <Image
                  source={item.image}
                  resizeMode="cover"
                  className="w-16 h-16"
                />
                <View className="space-y-2 items-center">
                  <Text
                    className="text-Primary"
                    style={{fontFamily: 'Poppins-Regular'}}>
                    {item.name}
                  </Text>
                  <Text
                    style={{fontFamily: 'Poppins-Medium'}}
                    className="text-center">
                    ${item.price}
                  </Text>
                </View>
              </View>

              <View className="flex-row space-x-2">
                <Pressable className="bg-Primary w-8 h-8 rounded-full items-center justify-center">
                  <Image
                    source={require('../../../assets/icons/cartIcon.png')}
                  />
                </Pressable>
                <Pressable
                  className="bg-[#FF5552] w-8 h-8 rounded-full items-center justify-center"
                  onPress={() => handleDelete(item.id)}>
                  <Image
                    source={require('../../../assets/icons/deleteIcon.png')}
                  />
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({});
