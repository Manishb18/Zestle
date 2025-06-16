import React, {useEffect, useState} from 'react';
import {StyleSheet, View, PermissionsAndroid, Platform, Alert} from 'react-native';
import TopSection from '../../components/custom-components/TopSection';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const Location = ({navigation}: {navigation: NavigationProp<ParamListBase>}) => {
  const [region, setRegion] = useState({
    latitude: 37.78825, // Default latitude
    longitude: -122.4324, // Default longitude
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [location, setLocation] = useState<null | { latitude: number; longitude: number }>(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          Alert.alert('Location Permission Denied');
        }
      } else {
        getCurrentLocation(); // iOS automatically requests location permission
      }
    };

    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        (position) => {
          const {latitude, longitude} = position.coords;
          setLocation({latitude, longitude});
          setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.005, // Zoom closer to user's location
            longitudeDelta: 0.005,
          });
        },
        (error) => {
          console.error(error);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    };

    requestLocationPermission();
  }, []);

  return (
    <View className="h-full relative">
      <TopSection text={'Location'} handleGoBack={() => navigation.goBack()} />
      <View className="absolute w-full h-1/2 -z-10">
        <MapView
          style={styles.map}
          region={region}
          showsUserLocation={true} // Show user's location dot on the map
        >
          {location && (
            <Marker
              coordinate={{latitude: location.latitude, longitude: location.longitude}}
              title="You are here"
            />
          )}
        </MapView>
      </View>
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});
