import { View, ActivityIndicator, Text, TouchableOpacity, TextInput} from "react-native";
import React from 'react'

const TextField = ({text, placeholderTextColor, textContainerStyles, textInputStyles, placeholderText, handleTextChange}) => {
  return (
    <View className="font-pregular mt-3">
      <Text className = {`font-pregula text-white text-sm ${textContainerStyles}`}>{text}</Text>
      <TextInput
        className = {`h-12 mt-2 w-full px-3 rounded-md focused:border-secondary-200 ${textInputStyles}`}
        style = {{backgroundColor: "#e7e0fb", boxShadow : "0px 2px 2px rgba(0, 0, 0, 0.25)"}}
        placeholderTextColor = {`${placeholderTextColor}`}
        placeholder = {placeholderText}
        onChangeText={handleTextChange}
      />
    </View>
  )
}

export default TextField