import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, Platform } from 'react-native';
import CustomButton from '../../components/custom-components/CustomButton';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationProp } from '@react-navigation/native';
import { AppDispatch } from '../../redux/store/store';
import { useDispatch } from 'react-redux';
import { google_signin, loginUser } from '../../redux/features/user/authThunks';
import Snackbar from 'react-native-snackbar';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const Signin = ({navigation}: {navigation: NavigationProp<any>}) => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(()=>{
    GoogleSignin.configure({
      webClientId: '13604293684-ap7rk1tkqrc8ohj84ijut2v0bjt95mcb.apps.googleusercontent.com',
    });
  }, []);

  const handleGoogleButtonPress = async () => {
    try {
      console.log("started to signin...");
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      console.log("passed this...");
      // Get the users ID token
      const res = await GoogleSignin.signIn();
      const idToken = res.data?.idToken || '';
      const userData = res.data?.user;
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken || null);
      console.log("userdata",userData);
      // Sign-in the user with the credential
      const result = await  auth().signInWithCredential(googleCredential);
      const google_signin_response = await dispatch(google_signin(idToken));
        if(google_signin.fulfilled.match(google_signin_response)){
          //just show the snack bar as we are not navigating anywhere the home navigation happends as we are setting authenticated to true
          Snackbar.show({
            text: "Login Successful",
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



  const handlePhoneChange = (value: string) => {
    setPhone(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleSubmit = async () => {
    try {
      console.log('Submitting login with:', { phone, password });
      const loginResponse = await dispatch(loginUser({phone, password}));
      console.log('Login response:', loginResponse);
      
      if (loginUser.fulfilled.match(loginResponse)) {
        console.log('Login successful:', loginResponse.payload);
        Snackbar.show({
          text: "Login successful",
          duration: Snackbar.LENGTH_LONG,
        });
      } else {
        console.error('Login failed:', loginResponse.payload);
        Snackbar.show({
          text: "Failed to login",
          duration: Snackbar.LENGTH_LONG,
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      Snackbar.show({
        text: "Failed to login",
        duration: Snackbar.LENGTH_LONG,
      });
    }
  }
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const socialButtonStyle = {
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
  };

  return (
    <View className="flex-1 bg-white relative">
      <View className='bg-[#D4DB2826] absolute -top-[418px] -left-[143px] w-[700px] h-[700px] rounded-b-full'>
      </View>
      <View className="h-48 justify-center items-center top-14">
        <Image 
          source={require('../../../assets/images/logo-2.png')} 
          className="resize-contain"
        />
      </View>
      <View className="p-5 mt-20" >
        <Text className="text-2xl  mb-2 text-textPrimary" style={{fontFamily: 'Poppins-Regular'}}>Login</Text>
        <Text className=" font-poppins text-textSecondary" style={{fontFamily: 'Poppins-Regular'}}>Welcome back!</Text>
        <Text className="mb-5 font-poppins text-textSecondary" style={{fontFamily: 'Poppins-Regular'}}>Please login to continue</Text>
        
        <TextInput
          className="border border-gray-300 rounded-3xl p-3 mt-4  bg-[#EEEDEE] px-4"
          style={{fontFamily: 'Poppins-Regular', color: '#4E424C80'}}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={handlePhoneChange}
        />
        <View className="relative">
          <TextInput
            className="border border-gray-300 rounded-3xl p-3 mt-4 pr-10 bg-[#EEEDEE] px-4"
            style={{fontFamily: 'Poppins-Regular', color: '#4E424C80'}}
            placeholder="Password"
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity 
            className="absolute right-3 top-7"
            onPress={togglePasswordVisibility}
          >
            <Icon 
              name={showPassword ? 'eye-off' : 'eye'} 
              size={24} 
              color="#8B8B8B"
            />
          </TouchableOpacity>
        </View>
        <View className='mt-14 w-1/2 mx-auto'>
          <CustomButton title='Login' onPress={handleSubmit}/>
        </View>
        
        <Text className="text-[#F15A23] text-center mt-4" onPress={() => navigation.navigate('forgotPassword')}>Forgot Password?</Text>
        
        <View className="flex-row justify-center mt-6">
          <TouchableOpacity style={socialButtonStyle} onPress={handleGoogleButtonPress}>
            <Image 
              source={require('../../../assets/images/google-icon.png')} 
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity style={socialButtonStyle}>
            <Image 
              source={require('../../../assets/images/facebook-icon.png')} 
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        
        <Text className="text-center mt-6">
          Don't have an account? {' '}
          <Text className="text-[#BC8363]" onPress={() => navigation.navigate('Signup')}>Create New</Text>
        </Text>
      </View>
    </View>
  );
};

export default Signin;
