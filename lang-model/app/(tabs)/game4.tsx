import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import PlayHTTextToSpeech from '../../components/tts';
import { useAuth } from '../../context/GlobalProvider';

const JumbledSentence = () => {
  const [selectedWords, setSelectedWords] = useState([]);
  const [options, setOptions] = useState([]);
  const [translation, setTranslation] = useState("");
  const [targetSentence, setTargetSentence] = useState("");

  const { jwtToken } = useAuth();

  useEffect(() => {
    fetch('http://localhost:8080/question/generateQuestion?questionType=4&language=french', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        const fetchedSentence = data.sentence;
        const fetchedTranslation = data.translation;

        setTranslation(fetchedTranslation);
        setTargetSentence(fetchedSentence);
        console.log("Translation:", fetchedTranslation);
        console.log("Sentence:", fetchedSentence);

        const wordsArray = fetchedTranslation.split(" ").map((word, index) => ({
          id: index,
          word: word,
        })).sort(() => Math.random() - 0.5); // Shuffle the array randomly

        setOptions(wordsArray);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        Alert.alert("Error", "Failed to fetch data from the server.");
      });
  }, []);

  useEffect(() => {
    console.log("Updated translation:", translation);
  }, [translation]);

  const selectWord = (selectedWord) => {
    if (!selectedWords.some((word) => word.id === selectedWord.id)) {
      setSelectedWords((prevSelectedWords) => [...prevSelectedWords, selectedWord]);
      setOptions((prevOptions) => prevOptions.filter((word) => word.id !== selectedWord.id));
    }
    console.log("Selected Words:", selectedWords);
  };

  const removeWord = (removedWord) => {
    if (selectedWords.some((word) => word.id === removedWord.id)) {
      setSelectedWords((prevSelectedWords) => prevSelectedWords.filter((word) => word.id !== removedWord.id));
      setOptions((prevOptions) => [...prevOptions, removedWord]);
    }
  };

  const checkAnswer = () => {
    const userSentence = selectedWords.map((word) => word.word).join(" ");
    
    if (userSentence === targetSentence) {
      Alert.alert("Correct!", "You solved the puzzle!");
    } else {
      Alert.alert("Incorrect", "Try again!");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Arrange the words:</Text>
        <PlayHTTextToSpeech textFrom={translation} languageFrom="french" IconStyle={styles.pronunciationIcon} />
      </View>
      <View style={styles.sentenceContainer}>
        {options.map((word, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.word, { backgroundImage: 'linear-gradient(45deg, #4F1DAE, #7e3ffb, #9D6CFF)' }]}
            onPress={() => selectWord(word)}
          >
            <Text style={styles.wordText}>{word.word}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.selectedSentenceContainer}>
        {selectedWords.map((word, index) => (
          <TouchableOpacity
            key={index}
            style={styles.wordBox}
            onPress={() => removeWord(word)}
          >
            <Text style={styles.wordText}>{word.word}</Text>
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
