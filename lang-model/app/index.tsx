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
        </View>
      </ScrollView>
      <StatusBar style="light" backgroundColor='#161622'/>
    </SafeAreaView>
  );
}

