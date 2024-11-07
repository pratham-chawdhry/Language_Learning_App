import { Image, StyleSheet, Platform, Text, View, ScrollView} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Link, Redirect, router} from 'expo-router';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RiMicLine } from "react-icons/ri";
import "../global.css";

export default function HomeScreen() {
  return (
    <SafeAreaView className='bg-primary h-full' >
      <ScrollView contentContainerStyle = {{height: "100%"}} >
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image source = {require("@/assets/images/language-app.png")} className = "w-32 h-32" />
          <View className="relative mt-5">
            {/* <RiMicLine className = "bg-red-500 text-white rounded-full " /> */}
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless{"\n"}
              Possibilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">Where creativity meets innovation: embark on a limitless exploration with Aora</Text>
        </View>
      </ScrollView>
      <StatusBar style="light" backgroundColor='#161622'/>
    </SafeAreaView>
  );
}

