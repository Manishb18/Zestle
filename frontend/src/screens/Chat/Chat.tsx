import {  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View, } from 'react-native'
import React , {useState}from 'react'
import { navigationProp } from '../../types'
import TopSection from '../../components/custom-components/TopSection'

const Chat = ({navigation}: {navigation: navigationProp}) => {
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
        text={'Chat With Us'}
        handleGoBack={() => navigation.goBack()}
      />

      <View className="flex-1 relative">
        <View className="messages absolute bottom-2 right-0 space-y-2">
          {messages.map((item, index) => (
            <View className="bg-green-500 rounded-3xl p-2 px-4 justify-center" style={{ alignSelf: 'flex-end' }}>
              <Text
                className="text-white"
                style={{fontFamily: 'Poppins-Medium'}}>
                {item}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View className="flex-row justify-between items-center bg-gray-200 p-2 rounded-lg ">
        <TextInput
          placeholder="Write Message"
          value={message}
          onChangeText={handleInputChange} 
          className="text-base w-2/3"
          style={{fontFamily: 'Poppins-Regular'}}
        />
        <View className="flex-row space-x-4">
          <Pressable>
            <Image source={require('../../../assets/icons/uploadIcon.png')} />
          </Pressable>
          <Pressable onPress={handleSendMessage}>
            <Image source={require('../../../assets/icons/sendIcon.png')} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default Chat

const styles = StyleSheet.create({})