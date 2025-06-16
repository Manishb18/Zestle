import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import PopularProducts from '../../components/Home/PopularProducts';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';

const TopResults = () => {
  const Result = ({title}: {title: String}) => {
    return (
      <View className="bg-gray-300 border border-textPrimary rounded-xl p-2 w-24 m-2 items-center">
        <Text
          className="text-[#4E424C]"
          style={{fontFamily: 'Poppins-Regular'}}>
          {title}
        </Text>
      </View>
    );
  };
  return (
    <View className="mt-4">
      <Text style={{fontFamily: 'Poppins-SemiBold'}} className="text-black">
        Top Results
      </Text>
      <View className="flex flex-row w-full flex-wrap mt-2">
        <Result title={'Mango'} />
        <Result title={'Spinach'} />
        <Result title={'Oranges'} />
        <Result title={'Potatoes'} />
      </View>
    </View>
  );
};

const NoProductsFound = () => {
  return (
    <View className="items-center my-8 space-y-4">
      <Image source={require('../../../assets/icons/itemsNotFound.png')} />
      <Text
        className="justify-center text-black w-1/2 text-center"
        style={{fontFamily: 'Poppins-Medium'}}>
        Product not found. Search for other product.
      </Text>
    </View>
  );
};

const Search = ({navigation}: {navigation: NavigationProp<ParamListBase>}) => {
  const [searchText, setSearchText] = useState('');
  const [itemsFound, setItemsFound] = useState(false);
  const { popularProducts } = useSelector((state: RootState) => state.product);

  const handleSearchChange = (e: any) => {
    setSearchText(e.target.value);
  };
  const handleBackClick = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false} className="mt-4">
        <Pressable onPress={handleBackClick}>
          <Image source={require('../../../assets/icons/leftArrow.png')} />
        </Pressable>

        <View className=" flex flex-row items-center mx-auto bg-[#e8ecef] rounded-lg mt-4">
          <Image
            source={require('../../../assets/icons/searchIcon.png')}
            className="mx-4"
          />
          <TextInput
            placeholder="Typing..."
            placeholderTextColor={'#4E424C80'}
            className="text-sm w-full"
            value={searchText}
            onChange={handleSearchChange}
          />
        </View>
        {itemsFound ? (
          <TopResults />
        ) : (
          <View className="space-y-8">
            <NoProductsFound />
            <PopularProducts popularProducts={popularProducts} navigation={navigation} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({});
