import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import TextField from '../../components/TextField';
import CustomButton from '../../components/CustomButton';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/GlobalProvider'; // Import useAuth here

const Home = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { storeToken } = useAuth(); // Use useAuth here to access storeToken

  // Function to handle Sign Up
  const handleSignUp = async () => {
    setIsLoading(true);
    const { email, password} = form;

    // Validating the input fields
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Logged in successfully!');
        storeToken(data.token); // Store the token using context
        router.push('/home');
      } else {
        Alert.alert('Error', data.message || 'Sign in failed');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred during sign in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <View style={styles.container}>
          <View className="relative z-10 justify-center min-h-[85vh] px-4">
            <Text className="text-2xl text-white mt-4">Sign in</Text>

            <TextField
              text="Email"
              placeholderTextColor="#7B7B8B"
              placeholderText="Enter your email"
              handleTextChange={(e) => setForm({ ...form, email: e })}
            />

            {/* <TextField
              text="Username"
              placeholderTextColor="#7B7B8B"
              placeholderText="Enter your username"
              handleTextChange={(e) => setForm({ ...form, username: e })}
            /> */}

            <TextField
              text="Password"
              placeholderTextColor="#7B7B8B"
              placeholderText="Enter your password"
              handleTextChange={(e) => setForm({ ...form, password: e })}
            />

            <CustomButton
              title="Sign in"
              handlePress={handleSignUp}
              containerStyles="w-full mt-7"
              isLoading={isLoading}
            />

            <View className="flex justify-center items-center mt-3">
              <Text className="text-sm font-pregular mt-3 text-white">
                Do not have an account?
                <Text
                  style={{ color: '#7e3ffb' }}
                  onPress={() => router.push('/sign-up')}
                >
                  {' '}
                  Sign up
                </Text>
              </Text>
            </View>
          </View>

          {/* Wave Backgrounds */}
          <View style={styles.wave1}>
            <Svg height="180" width="100%" viewBox="0 0 1440 600">
              <Path
                fill="#5907f8"
                fillOpacity="0.4"
                d="M0,160L60,192C120,224,240,288,360,320C480,352,600,352,720,300C840,248,960,160,1080,144C1200,128,1320,176,1380,208L1440,240L1440,600L1380,600C1320,600,1200,600,1080,600C960,600,840,600,720,600C600,600,480,600,360,600C240,600,120,600,60,600L0,600Z"
              />
            </Svg>
          </View>

          <View style={styles.wave2}>
            <Svg height="190" width="100%" viewBox="0 0 1440 700">
              <Path
                fill="#e7e0fb"
                fillOpacity="0.8"
                d="M0,288L60,272C120,256,240,224,360,213.3C480,203,600,245,720,277.3C840,309,960,341,1080,362.7C1200,384,1320,394,1380,394.7L1440,400L1440,700L1380,700C1320,700,1200,700,1080,700C960,700,840,700,720,700C600,700,480,700,360,700C240,700,120,700,60,700L0,700Z"
              />
            </Svg>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4F1DAE',
    position: 'relative',
  },
  wave1: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    zIndex: 1,
  },
  wave2: {
    position: 'absolute',
    bottom: -20,
    left: 0,
    width: '100%',
    zIndex: 0,
  },
});

export default Home;
