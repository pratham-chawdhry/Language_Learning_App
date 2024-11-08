import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text, StatusBar, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';
import axios from 'axios';

// Sample data with letters and pronunciation text in French
const DATA = [
  {id: '1', title: 'A', pronounciation: 'aaa'},
  {id: '2', title: 'B', pronounciation: 'bey'},
  {id: '3', title: 'C', pronounciation: 'cey'},
  {id: '4', title: 'D', pronounciation: 'dey'},
  {id: '5', title: 'E', pronounciation: 'ey'},
  // ... add other letters as needed
];

const screenWidth = Dimensions.get('window').width;
const itemSize = 110;

const Item = ({ title, pronunciation }) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const playPronunciation = async () => {
    try {
      // API call to Speechify to get the pronunciation audio in French
      const response = await axios.get('https://api.speechify.com/v1/synthesize', {
        headers: {
          'Authorization': `1Y8R2kJ9rdtO0tqv_rUyayHd_AN_WJaBc_0lk7Te7mI=`, // Replace with your Speechify API Key
          'Content-Type': 'application/json',
        },
        params: {
          text: pronunciation,
          voice: 'fr_fr_female', // Example French voice, adjust based on available voices
          speed: 1.0,
        },
      });

      const audioUrl = response.data.audio_url;

      // Load and play the audio
      const { sound: newSound } = await Audio.Sound.createAsync({ uri: audioUrl });
      setSound(newSound);
      await newSound.playAsync();
    } catch (error) {
      console.error("Error fetching audio from Speechify API:", error);
      Alert.alert("Error", "Could not fetch the audio for pronunciation.");
    }
  };

  return (
    <TouchableOpacity onPress={playPronunciation} style={[styles.item, { width: itemSize, height: itemSize }]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.pronunciation}>{pronunciation}</Text>
    </TouchableOpacity>
  );
};

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} pronunciation={item.pronounciation} />}
        keyExtractor={(item) => item.id}
        numColumns={Math.floor(screenWidth / itemSize)}
      />
    </SafeAreaView>
  </SafeAreaProvider>
);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#4F1DAE',
    padding: 10,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
    textAlign: 'center',
  },
  pronunciation: {
    fontSize: 12,
    color: '#fff',
  },
});
