import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Image,
    Dimensions,
    ScrollView,
    TouchableOpacity,
  } from 'react-native';
  import {
    NavigationProp,
    RouteProp,
    ParamListBase,
  } from '@react-navigation/native';
  
  import React, { useState } from 'react';
  const {width, height} = Dimensions.get('window');
  console.log(width, height);
  
  const TopSection = ({handleGoBack}: {handleGoBack: any}) => {
    return (
      <View className="flex-row justify-between items-center mt-2">
        <View className="flex-row items-center space-x-4">
          <Pressable onPress={handleGoBack}>
            <Image source={require('../../../assets/icons/leftArrow.png')} />
          </Pressable>
          <Text
            style={{fontFamily: 'Poppins-SemiBold'}}
            className="text-lg text-[#4E424C]">
            Product Details
          </Text>
        </View>
      </View>
    );
  };
  
  const ProductSection = ({item} : {item:any}) => {
    return (
      <View className="flex-row w-full mt-4 space-x-4 relative">
         <View
          className={`absolute w-[130%] h-[130%]  rounded-full overflow-hidden -right-64`}>
          <Image
            source={require('../../../assets/images/Products/Oranges.jpg')}
            resizeMode="cover"
            className="w-3/4 h-full"
          />
          <Image
            source={require('../../../assets/icons/heartIcon.png')}
            className="absolute  left-52 top-4"
          />
        </View>
        {/* details section */}
        <View className="w-full h-96 space-y-12 ">
         {/* Name and ratings */}
          <View className="space-y-2 mt-4">
            <Text
              style={{fontFamily: 'Poppins-Regular'}}
              className="text-Primary text-2xl">
              {item.name}
            </Text>
            <View className="flex-row space-x-2">
              <Image source={require('../../../assets/icons/Star.png')} />
              <Image source={require('../../../assets/icons/Star.png')} />
              <Image source={require('../../../assets/icons/Star.png')} />
              <Image source={require('../../../assets/icons/Star.png')} />
              <Image source={require('../../../assets/icons/HalfStar.png')} />
            </View>
          </View>
  
          {/* Quantity */}
          <View className='bg-Secondary w-24 h-48  rounded-tl-full rounded-b-full items-center justify-center'>
            <View className='space-y-4'>
              <Text className='text-[#FFFFFFBF] text-xs text-center' style={{fontFamily: "Poppins-Regular"}}>Weight</Text>
              <Pressable className='items-center'>
                <Image source={require("../../../assets/icons/plusIcon.png")}/>
              </Pressable>
              <Text className='text-white text-xl' style={{fontFamily : "Poppins-SemiBold"}}>500 gr.</Text>
              <Pressable className='items-center'>
                <Image source={require("../../../assets/icons/minusIcon.png")}/>
              </Pressable>
            </View>
          </View>
  
  
          {/* price */}
          <View className='space-y-1 top-8'>
            <Text className='text-[#4E424C]' style={{fontFamily:"Poppins-Regular"}}>Total Price</Text>
            <View className='bg-Primary items-center justify-center w-36 h-10 rounded-l-full rounded-br-full rounded-tr-md'>
              <Text className='text-white text-xl' style={{fontFamily : "Poppins-SemiBold"}}>${item.price}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  
  const DetailsSection = () => {
    const maxLines = 4; // Maximum lines to show initially
    const [isExpanded, setIsExpanded] = useState(false);
  
    const toggleExpand = () => {
      setIsExpanded(!isExpanded);
    };
  
    return (
      <View className='mt-24 mx-2'>
        <Text className='text-[#4E424C] text-xl' style={{fontFamily:"Poppins-Medium"}}>Details</Text>
        <Text
          className={`mt-2 text-[#4E424C80] text-xs leading-5 w-[90%] items-center text-justify ${!isExpanded ? 'line-clamp-2' : ''}`}
          style={{fontFamily: "Poppins-Regular"}}
          numberOfLines={isExpanded ? undefined : maxLines}
        >
          Oranges are popular due to their natural sweetness, the many different types available, and the diversity of uses. For example, a person can consume them in juices and marmalades, eat them whole, or use zested peel to add a tangy flavor to cakes and desserts.
        </Text>
        <TouchableOpacity onPress={toggleExpand}>
          <Text className='text-green-500'>{isExpanded ? "Read Less" : "Read More"}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  const DeliveryDetails  = ()=>{
    return (
      <View className='flex-row items-center space-x-4 mt-8 mx-2'>
        <Text className='text-[#4E424C] text-xl leading-7' style={{fontFamily:"Poppins-Medium"}}>Estimated delivery date : </Text>
        <Text className='text-[#000000BF'  style={{fontFamily:"Poppins-Regular"}}>29-Nov-2024</Text>
      </View>
    )
  }
  
  const AddToCart = ()=>{
    return (
      <TouchableOpacity className='flex-row items-center justify-center space-x-2 w-[80%] mt-12 mx-auto bg-Primary rounded-3xl p-4'>
        <Text className='text-white' style={{fontFamily:"Poppins-Medium"}}>Add to Cart</Text>
        <Image source={require("../../../assets/icons/cartIcon.png")}/>
      </TouchableOpacity>
    )
  }
  
  const ProductDetails = ({
    route,
    navigation,
  }: {
    route: RouteProp<ParamListBase>;
    navigation: NavigationProp<ParamListBase>;
  }) => {
  
    const {Product} = route.params as {Product: any};
    const handleGoBack = () => {
      navigation.goBack();
    };
    return (
      <ScrollView className="p-2">
        <TopSection handleGoBack={handleGoBack as () => void} />
        <ProductSection item={Product} />
        <DetailsSection/>
        <DeliveryDetails/>
        <AddToCart/>
      </ScrollView>
    );
  };
  
  export default ProductDetails;
  
  const styles = StyleSheet.create({});
  