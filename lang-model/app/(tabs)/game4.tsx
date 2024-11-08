import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView} from 'react-native';
import { GiSpeaker } from 'react-icons/gi';
import Tts from '../../components/tts';

const targetSentence = "The students must learn to work together to improve their language skills."
const translation = "Les étudiants doivent apprendre à travailler ensemble pour améliorer leurs compétences linguistiques.";
const wordsArray = targetSentence.split(" ").map((word, index) => ({
    id: index,
    word: word
})).sort(() => Math.random() - 0.5); // Shuffle the array randomly

const JumbledSentence = () => {
  const [selectedWords, setSelectedWords] = useState([]);
  const [availableWords, setAvailableWords] = useState(wordsArray);

  // Toggle the 'selected' state for a word
  const selectWord = (selectedWord) => {
    const object = availableWords.find((word) => word.word === selectedWord.word );

    if (object) {
      setSelectedWords([...selectedWords, object]);
      setAvailableWords(availableWords.filter((word) => word.id !== object.id));
    }
  };

  const removeWord = (removedWord) => {
    const object = selectedWords.find((word) => word.word === removedWord.word);

    if (object) {
      setSelectedWords(selectedWords.filter((word) => word.id !== object.id));
      setAvailableWords([...availableWords, object]);
    }
  };

  // Check if the user's sentence matches the target sentence
  const checkAnswer = () => {
    const userSentence = selectedWords
      .filter((word) => word.selected)
      .map((word) => word.word)
      .join(" ");
    
    if (userSentence === targetSentence) {
      Alert.alert("Correct!", "You solved the puzzle!");
    } else {
      Alert.alert("Incorrect", "Try again!");
    }
  };

  return (
    // <ScrollView contentContainerStyle={styles.contentContainer}>
    <View style={styles.container}>
        <View className="flex flex-row justify-center items-center gap-1">
            <Text style={styles.title}>Arrange the words:</Text>
            <Tts textFrom={translation} languageFrom="french" IconStyle={styles.pronounciationIcon} />
        </View>


      <View style={styles.sentenceContainer}>
        {availableWords.map((word, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.word,{backgroundImage: 'linear-gradient(45deg, #4F1DAE, #7e3ffb, #9D6CFF)',}]}
              onPress={() => selectWord(word)} // Toggle selection
            >
              <Text style={styles.wordText}>{word.word}</Text>
            </TouchableOpacity>
        ))}
      </View>

      <View style={styles.selectedSentenceContainer}>

        {selectedWords.map((word, index) => (          <TouchableOpacity

            key={index}

            style={styles.wordBox}

            onPress={() => removeWord(word)} // Toggle selection
          >

            <Text style={styles.wordText} className='text-purple-500'>{word.word}</Text>

          </TouchableOpacity>

        ))}

      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.button} onPress={checkAnswer}>
          <Text style={styles.buttonText}>Check Answer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',  // Make the container take full screen
  },
  container: {
    // flex: 1,
    // padding: 20,
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: '#f5f5f5',
    // position: 'absolute',
    // height: '100%',
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f5f5f5',
    flexDirection: 'column',
  },
  selectedSentenceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    // backgroundColor: '#e0e0e0',
    width: '100%',
    padding: 10,
    borderRadius: 8,
    gap: 5, /* Controls both column and row gaps */
    rowGap: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sentenceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // minHeight: 192,
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
    position: 'relative', // Make the word bank position absolute
    top: 0,  
    // alignItems: 'center',
    // backgroundColor: '#e0e0e0',
  },
  selectedWordsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: '#e0e0e0',
    width: '100%',
    padding: 10,
    borderRadius: 8,
    position: 'relative',
    top : 192,
  },
  word: {
    fontSize: 8,
    color: '#fff',
    backgroundColor: '#4F1DAE',
    padding: 10,
    margin: 5,
    borderRadius: 8,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  },
  selectedWord: {
    fontSize: 18,
    color: '#fff',
    backgroundColor: '#4F1DAE',
    padding: 10,
    margin: 5,
    borderRadius: 8,
  },
  wordText: {
    fontSize: 15,
    color: '#fff',
  },
  bottomContainer: {
    flexGrow: 1,  // Allow the middle content to take up available space
    justifyContent: 'flex-end',  // Push the button to the bottom
    width: '100%',
  },
  buttonsContainer: {
    flexGrow: 1,  // Allow the middle content to take up available space
    justifyContent: 'flex-end',  // Push the button to the bottom
    width: '100%',
  },
  button: {
    backgroundColor: '#7e3ffb',
    padding: 10,
    margin: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
  wordBox: {

    borderWidth: 1, // Horizontal line effect

    borderColor: '#7e3ffb',

    borderRadius: 8,

    padding: 10,

    margin: 5,
    height: 40,

    backgroundColor: '#fff',

    alignItems: 'center',

    justifyContent: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',

  },
  pronounciationIcon: {
    color: ' #4F1DAE',
    fontSize: 20,
  },
});

export default JumbledSentence;