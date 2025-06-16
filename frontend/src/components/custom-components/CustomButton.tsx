import React from 'react'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  showArrow ?: Boolean;
  fontFamily ?: string;
  additionalStyles?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress, additionalStyles = '', showArrow = true, fontFamily = "Poppins-Bold", ...props}) => {
  return (
    <TouchableOpacity 
      className={`bg-[#7CB342] py-3 px-6 rounded-full flex-row items-center justify-center ${additionalStyles}`}
      onPress={onPress}
      {...props}
    >
      <Text className="text-white font-semibold text-base mr-4" 
      style={{fontFamily: fontFamily}}
      >{title}</Text>
      {showArrow && 
      <Icon name="arrow-forward" size={20} color="white" />
}
    </TouchableOpacity>
  )
}

export default CustomButton