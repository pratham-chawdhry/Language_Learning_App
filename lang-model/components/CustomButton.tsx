import { ActivityIndicator, Text, TouchableOpacity } from "react-native";


const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style = {{backgroundColor: '#7e3ffb',  boxShadow : "0px 2px 2px rgba(0, 0, 0, 0.25)"}}
      className={`rounded-xl min-h-[48px] flex flex-row justify-center items-center ${containerStyles} ${isLoading ? "opacity-50" : ""}`} 
      disabled={isLoading}
    >
      <Text className={`text-white font-psemibold text-lg ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;