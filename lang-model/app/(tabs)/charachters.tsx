import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, StatusBar, Dimensions, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { GiSpeaker } from 'react-icons/gi';
import { Audio } from 'expo-av';
import { fromByteArray } from 'base64-js';

const screenWidth = Dimensions.get('window').width;
const itemSize = 110; // Width based on screen width (3 items per row with spacing)
const API_URL = 'http://localhost:8080/question/generateCharacters?language=urdu';
const TOKEN = 'eyJhbGciOiJIUzM4NCJ9.eyJpYXQiOjE3MzEwODgwMDIsImV4cCI6MTczMTE3NDQwMiwiYXV0aG9yaXRpZXMiOiJST0xFX1VTRVIiLCJlbWFpbCI6Imxhd2RhIn0.HqdEiYa1B_A3jI33OZRwTPlxoaH5oKOBDTpS-Eu0WWyH7CDaseVeDlb-_rA6pgb_';

const App = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${TOKEN}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Data fetched:', result);
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
        Alert.alert('Error', 'Failed to load character data');
      }
    };

    fetchData();
  }, []);

  const generateAudio = async (text, language = 'urdu') => {
    if (!text) {
      Alert.alert('Error', 'Text is missing for audio generation');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/generate-audio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, language }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`HTTP error! Status: ${response.status} - ${errorMessage}`);
      }

      const audioArrayBuffer = await response.arrayBuffer();
      const base64Audio = `data:audio/mpeg;base64,${fromByteArray(new Uint8Array(audioArrayBuffer))}`;

      const { sound: newSound } = await Audio.Sound.createAsync({ uri: base64Audio });
      setSound(newSound);
      await newSound.playAsync();
    } catch (error) {
      console.error('Error generating audio:', error);
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const Item = ({ title, pronunciation }) => (
    <View style={[styles.item, { width: itemSize, height: itemSize }]}>
      <TouchableOpacity onPress={() => generateAudio(title)}>
        <GiSpeaker style={styles.pronunciationIcon} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.pronunciationContainer}>
        <Text style={styles.pronunciation}>{pronunciation}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={data}
          renderItem={({ item }) => <Item title={item.letter} pronunciation={item.pronunciation} />}
          keyExtractor={(item, index) => item.id || index.toString()} // Ensuring unique key using 'id' or 'index'
          numColumns={Math.floor(screenWidth / itemSize)}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundImage: 'linear-gradient(45deg, #4F1DAE, #7e3ffb, #9D6CFF)',
    padding: 10,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
    textAlign: 'center',
  },
  pronunciationContainer: {
    borderBottomWidth: 3,
    borderBottomColor: '#fff',
    borderStyle: 'dotted',
  },
  pronunciation: {
    fontSize: 12,
    color: '#fff',
    paddingBottom: 2,
  },
  pronunciationIcon: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 5,
  },
});

export default App;
