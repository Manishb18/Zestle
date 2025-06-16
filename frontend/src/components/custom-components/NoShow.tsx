import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

interface NoShowProps {
    image: any;
    text: string;
    subText: string;
  }

const NoShow : React.FC<NoShowProps> = ({image, text, subText}) => {
  return (
    <View style={styles.emptyContainer}>
    <Image source={image} resizeMode='cover' />
    <Text style={styles.emptyText}>{text}</Text>
    <Text style={styles.emptySubText}>{subText}</Text>
  </View>
  )
}

export default NoShow

const styles = StyleSheet.create({
    emptyContainer: {
        display : 'flex',
        marginTop : "50%",
        marginHorizontal: 'auto',
        alignItems: 'center',
        gap : 8,
        width: '66%',
      },
      emptyText: {
        fontSize: 18,
        color: '#4E424C',
        fontFamily: 'Poppins-Bold',
      },
      emptySubText: {
        fontSize: 12,
        color: '#4E434DBF',
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
      },
})