import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import { fromByteArray } from 'base64-js';
import { GiSpeaker } from 'react-icons/gi';

const PlayHTTextToSpeech = ({ textFrom, languageFrom, IconStyle}) => {
  const [text, setText] = useState(textFrom || '');
  const [language, setLanguage] = useState(languageFrom || 'english');
  const [isLoading, setIsLoading] = useState(false);
  const [sound, setSound] = useState(null);
  console.log(text, language);
  const generateFrenchAudio = async () => {
    console.log(textFrom)
    if (!textFrom) {
      console.log("text is empty")
      Alert.alert('Error', 'Please enter some text');
      return;
    }
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/generate-audio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ textFrom }),
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
      console.error('Error generating French audio:', error);
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

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={generateFrenchAudio}
        disabled={isLoading}
      >
        <View style={IconStyle}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            <GiSpeaker style={IconStyle} size={30} color="black" />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default PlayHTTextToSpeech;
