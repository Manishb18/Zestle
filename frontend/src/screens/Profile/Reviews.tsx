import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import TopSection from '../../components/custom-components/TopSection';
import { navigationProp } from '../../types';
import colors from '../../utils/colors';
import NoShow from '../../components/custom-components/NoShow';
import EmptyReviews from '../EmptyScreens/EmptyReviews';

const RatingButton = ({ rating }: { rating: string }) => {
  return (
    <View style={styles.ratingButton}>
      <Text>{rating}</Text>
      <Image source={require('../../../assets/icons/Star.png')} />
    </View>
  );
};

const Reviews = ({ navigation }: { navigation: navigationProp }) => {
  const [reviews, setReviews] = useState([
    {
      userProfile: 'path/to/bessie_cooper_image.jpg', // Replace with actual image path
      name: 'Bessie Cooper',
      rating: 5,
      productNames: [], // Add product names if available
      review:
        'Gravida molestie odio congue et at. Quis vestibulum velit laoreet nunc. Sit tincidunt morbi elit est, non. Mi dignissim nisl risus et sed tempus nisl amet. Porttitor dictum libero at nunc mi vel nunc dictum amet feugiat.',
    },
    {
      userProfile: 'path/to/marvin_mckinney_image.jpg', // Replace with actual image path
      name: 'Marvin McKinney',
      rating: 4,
      productNames: [], // Add product names if available
      review:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Vellit officia consequat duis enim velit mollit. Exerci tation veniam consequat sunt nostrud amet.',
    },
    {
      userProfile: 'path/to/esther_howard_image.jpg', // Replace with actual image path
      name: 'Esther Howard',
      rating: 3,
      productNames: [], // Add product names if available
      review:
        'Nulla Lorem mollit cupidatat iure. Laborum magna nulla quis ullamco aliquip dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.',
    },
  ]);

  // if(!reviews || reviews.length !== 0){
  //   return(
  //     <View style={styles.container}>
  //       <TopSection
  //         text={'Ratings & Reviews'}
  //         handleGoBack={() => navigation.goBack()}
  //       />
  //     </View>
  //   )
  // }

  return (
    <View style={styles.container}>
      <TopSection
        text={'Ratings & Reviews'}
        handleGoBack={() => navigation.goBack()}
      />

      {/* header section */}
      <ScrollView
        style={styles.ratingScrollView}
        horizontal
        showsHorizontalScrollIndicator={false}>
        <View style={styles.allButton}>
          <Text style={styles.allButtonText}>All</Text>
        </View>
        <RatingButton rating={'5'} />
        <RatingButton rating={'4'} />
        <RatingButton rating={'3'} />
        <RatingButton rating={'2'} />
        <RatingButton rating={'1'} />
      </ScrollView>

      <View style={styles.separator} />
      {reviews.length == 0 ? 
      <EmptyReviews/>
       : 
      <View style={styles.reviewList}>
        {reviews.map((review, index) => (
          <View key={index} style={styles.reviewCard}>
            <View style={styles.userRow}>
              {/* userprofile */}
              <View style={styles.userProfilePlaceholder} />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{review.name}</Text>
                <View style={styles.ratingStars}>
                  {Array.from({ length: review.rating }, (_, index) => (
                    <Image
                      key={index}
                      source={require('../../../assets/icons/Star.png')}
                    />
                  ))}
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.reviewText}>
                {review.review}
              </Text>
            </View>
          </View>
        ))}
      </View>}
    </View>
  );
};

export default Reviews;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  ratingButton: {
    width: 80,
    padding: 8,
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: 'gray',
    borderWidth: 1,
    justifyContent: 'center',
    marginHorizontal: 8,
    gap : 6
  },
  ratingScrollView: {
    marginTop: 32,
  },
  allButton: {
    backgroundColor: colors.primary, 
    width: 80,
    padding: 8,
    borderRadius: 20,
    alignItems: 'center',
  },
  allButtonText: {
    color: 'white',
  },
  separator: {
    width: '100%',
    borderBottomColor: '#4E424C66',
    borderBottomWidth: 1,
    marginTop: 16,
  },
  reviewList: {
    marginTop: 16,
    gap: 16,
  },
  reviewCard: {
    backgroundColor: '#E5E5E5', // Light gray background
    width: '100%',
    borderRadius: 16,
    padding: 8,
    gap: 8,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  userProfilePlaceholder: {
    backgroundColor: '#D1D5DB', // Gray color for placeholder
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  userInfo: {
    gap: 8,
  },
  userName: {
    fontFamily: "Poppins-Medium",
    color: colors.textColor, // Text color for user name
    fontSize: 16,
  },
  ratingStars: {
    flexDirection: 'row',
    gap: 8,
  },
  reviewText: {
    fontFamily: "Poppins-Regular",
    color: colors.textColor, // Text color for review
  },
});
