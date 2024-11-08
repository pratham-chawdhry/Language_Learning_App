import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { fromByteArray } from 'base64-js';

const PlayHTTextToSpeech = () => {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('german');
  const [isLoading, setIsLoading] = useState(false);
  const [sound, setSound] = useState(null);

  const generateFrenchAudio = async () => {
    if (!text) {
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
      <TextInput
        style={styles.input}
        placeholder="Enter text in French"
        value={text}
        onChangeText={setText}
      />
      <TouchableOpacity
        style={[styles.button, isLoading ? styles.buttonDisabled : null]}
        onPress={generateFrenchAudio}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Generating...' : 'Generate French Audio'}
        </Text>
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
