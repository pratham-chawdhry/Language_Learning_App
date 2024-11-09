import { Slot, Tabs, Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {useFonts} from 'expo-font'
import { SplashScreen } from 'expo-router';
import { useEffect } from 'react';
import "../global.css"
import { AuthProvider } from '../context/GlobalProvider'; 


// import { TabBarIcon } from '@/components/navigation/TabBarIcon';
// import { Colors } from '@/constants/Colors';
// import { useColorScheme } from '@/hooks/useColorScheme';

const RootLayout = () => {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    // <>

    //   <Text>Header</Text>
    //   <Slot />
    //   <Text>Footer</Text>
    // </>
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="tabs" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}

export default RootLayout;
