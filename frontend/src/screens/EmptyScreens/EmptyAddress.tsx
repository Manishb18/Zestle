import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import NoShow from '../../components/custom-components/NoShow';

const EmptyAddress = () => {
  return (
    <View>
      <NoShow
        image={require('../../../assets/images/emptyScreens/emptyAddress.png')}
        text="No Address found!"
        subText="You don’t have any address, Freshliii is waiting for you!"
      />
    </View>
  );
};

export default EmptyAddress;

const styles = StyleSheet.create({});
