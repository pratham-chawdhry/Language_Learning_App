import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';

const targetSentence = "React Native makes mobile development easy";
const wordsArray = targetSentence.split(" ").sort(() => Math.random() - 0.5); // Shuffle words

const JumbledSentenceGame = () => {
  const [selectedWords, setSelectedWords] = useState([]);
  const [availableWords, setAvailableWords] = useState(wordsArray);

  const selectWord = (word) => {
    setSelectedWords([...selectedWords, word]);
    setAvailableWords(availableWords.filter((item) => item !== word));
  };

  const resetGame = () => {
    setSelectedWords([]);
    setAvailableWords(wordsArray.sort(() => Math.random() - 0.5)); // Reshuffle on reset
  };

  const checkAnswer = () => {
    const userSentence = selectedWords.join(" ");
    if (userSentence === targetSentence) {
      Alert.alert("Correct!", "You solved the puzzle!");
    } else {
      Alert.alert("Incorrect", "Try again!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Arrange the sentence line by line:</Text>

      {/* Selected Words Display */}
      <View style={styles.sentenceContainer}>
        {selectedWords.map((word, index) => (
          <Text key={index} style={styles.selectedWord}>
            {word}
          </Text>
        ))}
      </View>

      {/* Jumbled Words on Separate Lines */}
      <ScrollView style={styles.wordsContainer}>
        {availableWords.map((word, index) => (
          <TouchableOpacity key={index} onPress={() => selectWord(word)} style={styles.wordContainer}>
            <Text style={styles.word}>{word}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Buttons for Check and Reset */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={checkAnswer}>
          <Text style={styles.buttonText}>Check Answer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={resetGame}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sentenceContainer: {
    minHeight: 120,
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  selectedWord: {
    fontSize: 22,
    color: '#4F1DAE',
    marginVertical: 5,
  },
  wordsContainer: {
    flex: 1,
    marginVertical: 10,
  },
  wordContainer: {
    backgroundColor: '#4F1DAE',
    padding: 12,
    marginVertical: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  word: {
    fontSize: 18,
    color: '#fff',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#7e3ffb',
    padding: 10,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default JumbledSentenceGame;
