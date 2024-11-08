import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import * as Speech from 'expo-speech';

const YourComponent: React.FC = () => {
  const [isReady, setIsReady] = useState(true); // Set it to true by default
  const [isSpeaking, setIsSpeaking] = useState(false); // Track if the speech is active

  // Function to start speaking in Spanish
  const startHandler = () => {
    if (isReady) {
      Speech.stop(); // Ensure any previous speech is stopped
      setIsSpeaking(true); // Start the loader

      Speech.speak("Hoy ha muerto mamá. O quizá ayer, no lo sé.", {
        language: 'es-ES', // Spanish language (Spain dialect, use 'es-MX' for Mexican Spanish)
        pitch: 1,          // Default pitch
        rate: 0.75,        // Speech rate
        onDone: () => {
          setIsSpeaking(false); // Stop the loader when speech is done
        },
        onError: () => {
          setIsSpeaking(false); // Stop the loader if there is an error
          console.log("Error with speech");
        }
      });
    } else {
      console.log("Speech is not ready yet or available");
    }
  };

  // Call checkSpeechAvailability when the component mounts (if needed for further platform-specific checks)
  useEffect(() => {
    if (typeof Speech.speak !== 'function') {
      console.log("Speech is not available on this platform.");
      setIsReady(false);
    }
  }, []);

  // Function to stop speaking
  const stopHandler = () => {
    Speech.stop();
    setIsSpeaking(false); // Stop the loader when stopped
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={startHandler} disabled={isSpeaking}>
        <Text style={styles.buttonText}>Sprechen</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={stopHandler} disabled={!isSpeaking}>
        <Text style={styles.buttonText}>Stopp</Text>
      </TouchableOpacity>

      {isSpeaking && (
        <ActivityIndicator size="large" color="#3498db" style={styles.loader} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '60%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  loader: {
    marginTop: 20,
  },
});

export default YourComponent;
