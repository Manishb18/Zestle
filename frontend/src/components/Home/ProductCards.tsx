import { StyleSheet, Text, View, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
import { navigationProp } from '../../types';

const cardList = [
    {
        id: '1',
        title: "Tomato",
        image: require('../../../assets/images/ProductCards/tomato.png'),
    },
    {
        id: '2',
        title: "Milk",
        image: require('../../../assets/images/ProductCards/milk-and-cheese.png'),
    },
    {
        id: '3',
        title: "Avocado",
        image: require('../../../assets/images/ProductCards/avacado.png'),
    },
];

const ProductCards = ({navigation}: {navigation: navigationProp}) => {
    const Button = () => {
        return (
            <TouchableOpacity style={styles.buttonContainer} onPress={()=>navigation.navigate("Categories")}>
                <Text style={styles.buttonText}>Shop Now</Text>
            </TouchableOpacity>
        );
    };

    const renderItem = ({ item }: { item: any }) => {
        return (
            <View style={styles.cardContainer}>
                <ImageBackground style={styles.imageBackground} source={item.image} resizeMode='cover'>
                    <View style={[styles.textContainer, item.title === "Avocado" ? styles.textContainerStart : styles.textContainerEnd]}>
                        <Text style={[styles.titleText, item.title !== "Avocado" && styles.whiteText]}>
                            ORGANIC FRESH HEALTHY {item.title.toUpperCase()}
                        </Text>
                        <Text style={[styles.descriptionText, item.title !== "Avocado" && styles.whiteText]}>
                            Delivers at your doorstep straight from the farm.
                        </Text>
                        <Button />
                    </View>
                </ImageBackground>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={cardList}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatListContent}
            />
        </View>
    );
};

export default ProductCards;

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
        width: '100%',
    },
    cardContainer: {
        width: 320, // Adjusted from 'w-80'
        height: 144, // Adjusted from 'h-36'
        marginHorizontal: 8,
        borderRadius: 12,
        overflow: 'hidden',
        fontFamily: 'Poppins-Regular',
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
    },
    textContainer: {
        width: '50%',
    },
    textContainerStart: {
        alignSelf: 'flex-start',
        marginLeft: 8,
    },
    textContainerEnd: {
        alignSelf: 'flex-end',
    },
    titleText: {
        fontSize: 14,
        fontFamily: 'Poppins-ExtraBold',
        textTransform: 'uppercase',
    },
    descriptionText: {
        fontSize: 8,
        fontFamily: 'Poppins-Regular',
        marginVertical: 4,
        width: '90%',
    },
    whiteText: {
        color: 'white',
    },
    buttonContainer: {
        backgroundColor: '#7CB342',
        width: 96, 
        height: 32, 
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 12,
        fontFamily: 'Poppins-SemiBold',
    },
    flatListContent: {
        paddingVertical: 8,
    },
});
