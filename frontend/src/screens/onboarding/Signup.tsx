import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, SafeAreaView, Platform, StyleSheet } from 'react-native';
import CustomButton from '../../components/custom-components/CustomButton';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationProp } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { google_signup, regiterUser } from '../../redux/features/user/authThunks';
import { AppDispatch } from '../../redux/store/store';
import { User } from '../../redux/types/user';
import Snackbar from 'react-native-snackbar';
import colors from '../../utils/colors';
import fonts from '../../utils/fonts';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const Signup = ({navigation}: {navigation: NavigationProp<any>}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [formData, setFormData] = useState<User>({
        name: '',
        phone: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    useEffect(()=>{
      GoogleSignin.configure({
        webClientId: '13604293684-ap7rk1tkqrc8ohj84ijut2v0bjt95mcb.apps.googleusercontent.com',
      });
    },[])

    const handleGoogleButtonPress = async () => {
      try {
        console.log("started to signup...");
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const res = await GoogleSignin.signIn();
        const idToken = res.data?.idToken || '';
        const userData = res.data?.user;
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken || null);
        // Sign-in the user with the credential
        const result = await auth().signInWithCredential(googleCredential); //this results in additional user details 
        
        const google_signup_response = await dispatch(google_signup(idToken));
        if(google_signup.fulfilled.match(google_signup_response)){
          //just show the snack bar as we are not navigating anywhere the home navigation happends as we are setting authenticated to true
          Snackbar.show({
            text: "Signup Successful",
            duration: Snackbar.LENGTH_LONG,
          });
        }
        else{
          Snackbar.show({
            text: "Failed to Signup. Try again",
            duration: Snackbar.LENGTH_LONG,
          });
        }

      } catch (error) {
        console.log(error);
      }
    };

    const handleChange = (name: string, value: string) => {
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async () => {
      try {
        const registerResponse = await dispatch(regiterUser(formData));
        console.log(registerResponse);
        if(regiterUser.fulfilled.match(registerResponse)){
          navigation.navigate('Signin');
        }
        else{
          Snackbar.show({
            text: "Failed to register",
            duration: Snackbar.LENGTH_LONG,
          });
        }
      } catch (error : any) {
        Snackbar.show({
          text: error?.message || 'Registration failed. Please try again.',
          duration: Snackbar.LENGTH_LONG,
        });
      }
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.backgroundCircle}></View>
          <View style={styles.logoContainer}>
            <Image 
              source={require('../../../assets/images/logo-2.png')} 
              style={styles.logo}
            />
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Welcome!</Text>
            <Text style={styles.description}>Please register to continue</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={formData.name}
              onChangeText={(value) => handleChange('name', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              value={formData.phone}
              onChangeText={(value) => handleChange('phone', value)}
            />
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={!showPassword}
                value={formData.password}
                onChangeText={(value) => handleChange('password', value)}
              />
              <TouchableOpacity 
                style={styles.eyeButton}
                onPress={togglePasswordVisibility}
              >
                <Icon 
                  name={showPassword ? 'eye-off' : 'eye'} 
                  size={24} 
                  color="#8B8B8B"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.socialButtonsContainer}>
              <TouchableOpacity style={styles.socialButton} onPress={handleGoogleButtonPress}>
                <Image 
                  source={require('../../../assets/images/google-icon.png')} 
                  style={styles.socialIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Image 
                  source={require('../../../assets/images/facebook-icon.png')} 
                  style={styles.socialIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <CustomButton title='Create' onPress={handleSubmit}/>
            </View>
            <Text style={styles.footerText}>
              Already have an account? {' '}
              <Text style={styles.loginLink} onPress={() => navigation.navigate('Signin')}>Login</Text>
            </Text>
          </View>
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backgroundCircle: {
    position: 'absolute',
    top: -418,
    left: -143,
    width: 700,
    height: 700,
    backgroundColor: '#D4DB2826',
    borderRadius: 350, 
  },
  logoContainer: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 56, // top-14 in NativeWind
  },
  logo: {
    resizeMode: 'contain',
  },
  formContainer: {
    padding: 20,
    marginTop: "auto",
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
    color: colors.textPrimary,
    fontFamily: fonts.regular,
  },
  subtitle: {
    fontFamily: fonts.regular,
    color: '#8B8B8B', // Replace with your secondary text color
  },
  description: {
    marginBottom: 20,
    fontFamily: fonts.regular,
    color: '#8B8B8B',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB', // border-gray-300
    borderRadius: 24, // rounded-3xl
    padding: 16,
    backgroundColor: '#EEEDEE',
    color: '#4E424C80',
    marginTop: 16,
  },
  passwordContainer: {
    position: 'relative',
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    top: 36,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  socialButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 14,
    paddingHorizontal: 48,
    marginHorizontal: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  buttonContainer: {
    marginTop: 24,
    width: '50%',
    alignSelf: 'center',
  },
  footerText: {
    textAlign: 'center',
    marginTop: 24,
    fontFamily: fonts.regular,
  },
  loginLink: {
    color: '#BC8363',
  },
});

export default Signup;
