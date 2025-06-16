import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import React from 'react';
import TopSection from '../../components/custom-components/TopSection';
import { navigationProp } from '../../types';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';

const EditProfile = ({ navigation }: { navigation: navigationProp }) => {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <View style={styles.container}>
      <TopSection
        text={'Edit Profile'}
        handleGoBack={() => navigation.goBack()}
      />
      <View style={styles.avatarContainer}>
        <LinearGradient
          colors={['#FFC7C3', '#FFC1D0']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.avatarGradient}>
          <Image
            source={require('../../../assets/images/avatar.png')}
            style={styles.avatarImage}
          />
        </LinearGradient>
        <View style={styles.refreshIconContainer}>
          <Image source={require("../../../assets/icons/refreshIcon.png")} />
        </View>
      </View>

      <View style={styles.separator} />
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Name :</Text>
          <Text style={styles.value}>{user?.name}</Text>
        </View>
       
        <View style={styles.infoRow}>
          <Text style={styles.label}>Birthdate :</Text>
          <Text style={styles.value}>1/1/24</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Gender :</Text>
          <Text style={styles.value}>Female</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>E-mail :</Text>
          <Text style={styles.value}>{user?.email || "null"}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Phone Number :</Text>
          <Text style={styles.value}>{user?.phone}</Text>
        </View>
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  avatarContainer: {
    width: 144,
    height: 144,
    borderRadius: 72,
    marginHorizontal: 'auto',
    marginTop: 48,
    position: 'relative',
  },
  avatarGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 72,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {

  },
  refreshIconContainer: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    bottom: -4,
    right: 16,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    width: '95%',
    borderColor: '#4E424C66',
    borderWidth: 1,
    marginHorizontal: 'auto',
    marginTop: 48,
  },
  infoContainer: {
    width: '100%',
    marginTop: 16,
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontFamily: "Poppins-Regular",
    color: '#4E424C80',
    fontSize: 14,
  },
  value: {
    fontFamily: "Poppins-Medium",
    color: '#4E424C',
  },
});
