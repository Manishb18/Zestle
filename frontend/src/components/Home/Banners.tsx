import React, { memo } from 'react';
import { StyleSheet, Text, View, FlatList, ImageBackground, TouchableOpacity, Image, Pressable } from 'react-native';
import { navigationProp } from '../../types';
import { Banner } from '../../redux/types/banner';
import { baseUrl } from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store/store';
import { resetProducts, setOffset, setFilters } from '../../redux/features/products/productSlice';


const Banners = memo(({navigation, banners}: {navigation: navigationProp, banners: Banner[]}) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleBannerClick = (categorySlug: string) => {
        dispatch(setFilters({category : categorySlug, price : '', rating : '', discount : '', sort : ''}));
        dispatch(setOffset(0));
        dispatch(resetProducts());  
        navigation.navigate('Products', {addedCategory : true});
    };

    const renderItem = ({ item }: { item: any }) => {
        return (
            <Pressable style={styles.cardContainer} 
            onPress={() => handleBannerClick(item.category.slug)}
            >
                <Image style={styles.imageBackground} source={{ uri: `${baseUrl}/${item.bannerImage}` }} resizeMode='cover'/>
            </Pressable>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={banners}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatListContent}
            />
        </View>
    );
});

export default Banners;

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
        width: '100%',
    },
    cardContainer: {
       minWidth: 280,
       height: 144,
        marginHorizontal: 8,
       borderRadius: 12,
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
    },
    flatListContent: {
        paddingVertical: 8,
    },
});
