import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import TopSection from '../../components/custom-components/TopSection';
import {navigationProp} from '../../types';
import Icon from 'react-native-vector-icons/Ionicons';

const Help = ({navigation}: {navigation: navigationProp}) => {
  const [messages, setMessages] = useState(['Hello', 'i want refund']);
  const [message, setMessage] = useState('');

  const handleInputChange = (text : string)=>{
    setMessage(text);
  }
  const handleSendMessage = () => {
    setMessages(prev => [...prev, message]);
    setMessage("");
  };

  return (
    <View className="p-4 h-full flex-1">
      <TopSection
        text={'Help'}
        handleGoBack={() => navigation.goBack()}
      />

      <View className='mt-4 space-y-2'>
        <Text className='text-lg  text-textColor' style={{fontFamily:"Poppins-SemiBold"}}>Contact Us</Text>

        <View className='flex-row items-center space-x-2'>
          <Icon name='call-outline' size ={24} color={"green"}/>
          <Text style={{fontFamily:"Poppins-Regular"}}>Call</Text>
        </View>
        <View className='flex-row items-center space-x-2'>
          <Icon name='mail-outline' size ={24} color={"green"}/>
          <Text style={{fontFamily:"Poppins-Regular"}}>E-Mail</Text>
        </View>
        <View className='flex-row items-center space-x-2'>
          <Icon name='chatbox-outline' size ={24} color={"green"}/>
          <Text style={{fontFamily:"Poppins-Regular"}}>Send Feedback</Text>
        </View>
      </View>
    </View>
  );
};

export default Help;

const styles = StyleSheet.create({});
