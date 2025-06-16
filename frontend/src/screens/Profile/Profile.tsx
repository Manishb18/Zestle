import React, { useMemo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TopSection from '../../components/custom-components/TopSection';
import { navigationProp } from '../../types';
import LinearGradient from 'react-native-linear-gradient';
import { logoutUser } from '../../redux/features/user/authThunks';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import { User } from '../../redux/types/user';
import colors from '../../utils/colors';
import fonts from '../../utils/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileMainSection = React.memo(({ user }: { user: User }) => {
  return (
    <View style={styles.profileMainContainer}>
      <LinearGradient
        colors={[

          'rgba(212, 219, 40, 0.25)', // At 0%
          'rgba(212, 219, 40, 0)', // At 26.56%
          'rgba(212, 219, 40, 0)', // At 63.54%
          'rgba(212, 219, 40, 0.25)', // At 100%
        ]}
        start={{ x: 0.5, y: 0 }} // Vertical start (top)
        end={{ x: 0.5, y: 1 }} // Vertical end (bottom)
        style={styles.linearGradient}
      >
        <View style={styles.avatarContainer}>
          <View style={styles.innerCircle}>
            <View style={styles.avatarBorder}>
              <View style={styles.avatarWrapper}>
                <LinearGradient
                  colors={['#FFC7C3', '#FFC1D0']}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                  style={styles.avatarGradient}
                >
                  <Image
                    source={require("../../../assets/images/avatar.png")}
                    style={styles.avatarImage}
                  />
                </LinearGradient>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
      <Text style={styles.greetingText}>Hi {user?.name}</Text>
    </View>
  );
});

const NavigationButton = React.memo(({ icon, text, onPress }: { icon: React.ReactNode, text: string, onPress: () => void }) => (
  <TouchableOpacity style={styles.navButton} onPress={onPress}>
    {icon}
    <Text style={styles.navText}>{text}</Text>
  </TouchableOpacity>
));

const Profile = ({ navigation }: { navigation: navigationProp }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleNavigation = (routeName: string) => {
    navigation.navigate(routeName);
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
  };

  const memoizedProfileMainSection = useMemo(() => (
    <ProfileMainSection user={user as User} />
  ), [user]);

  const memoizedNavigationButtons = useMemo(() => (
    <View style={styles.navigationContainer}>
      <NavigationButton icon={<Image source={require("../../../assets/icons/user.png")} />} text="Profile" onPress={() => handleNavigation("EditProfile")} />
      <NavigationButton icon={<Image source={require("../../../assets/icons/reviewIcon.png")} />} text="Ratings & Reviews" onPress={() => handleNavigation("Ratings")} />
      <NavigationButton icon={<Image source={require("../../../assets/icons/locationIcon.png")} />} text="My addresses" onPress={() => handleNavigation("Addresses")} />
      <NavigationButton icon={<Ionicons name="bag-outline" size={24} color="black" />} text="Orders" onPress={() => handleNavigation("Orders")} />
      <NavigationButton icon={<Image source={require("../../../assets/icons/voucher.png")} />} text="Vouchers" onPress={() => handleNavigation("Vouchers")} />
      <NavigationButton icon={<Image source={require("../../../assets/icons/bell.png")} />} text="Notifications" onPress={() => handleNavigation("Notifications")} />
      <NavigationButton icon={<Image source={require("../../../assets/icons/headset.png")} />} text="Help" onPress={() => handleNavigation("Help")} />
      <NavigationButton icon={<Image source={require("../../../assets/icons/logoutIcon.png")} />} text="Logout" onPress={handleLogout} />
    </View>
  ), [handleNavigation, handleLogout]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/ProfileDesign.png')}
        style={styles.backgroundImage}
      />
      <TopSection text={'Profile'} handleGoBack={handleGoBack} />
      {memoizedProfileMainSection}
      {memoizedNavigationButtons}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    position: 'relative',
    borderWidth: 2,
    height: '100%',
    justifyContent: 'space-between',
  },
  backgroundImage: {
    position: 'absolute',
    zIndex: -10,
    top: -48,
  },
  profileMainContainer: {
    alignItems: 'center',
    marginTop: 36,
    marginBottom: "auto",
  },
  linearGradient: {
    padding: 3,
    borderRadius: 100,
    width: 196,
    height: 196,
    transform: [{ rotate: '90deg' }],
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 192,
    height: 192,
    borderRadius: 96,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: '#D4DB2880',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarBorder: {
    width: 128,
    height: 128,
    borderRadius: 64,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarWrapper: {
    width: '100%',
    height: '100%',
    borderRadius: 64,
    overflow: 'hidden',
  },
  avatarGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    transform: [{ rotate: '270deg' }],
  },
  greetingText: {
    fontFamily: fonts.regular,
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
  },
  navigationContainer: {
    height: 396,
    width: 384,
    padding: 16,
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  navText: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.textColor,
    marginLeft: 10,
  },
});

export default React.memo(Profile);
