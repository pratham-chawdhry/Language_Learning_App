import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useAuth } from '../context/GlobalProvider'; 

const JumbledSentence = () => {
  const [selectedWords, setSelectedWords] = useState([]);
  const [options, setOptions] = useState([]);
  const [translation, setTranslation] = useState("");
  const [targetSentence, setTargetSentence] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [noOfAttempts, setNoOfAttempts] = useState(0);

  const { jwtToken, language, incrementQuestionNumber, endTest} = useAuth();
  console.log("Token:", jwtToken);

  // Fetch data from API on component mount
  useEffect(() => {
    fetch(`http://localhost:8080/question/generateQuestion?questionType=4&language=${language}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        // Extract sentence and translation from the API response
        const fetchedTranslation = data.sentence;
        const fetchedSentence = data.translation;
    
        // Set translation and targetSentence
        setTranslation(fetchedSentence);
        setTargetSentence(fetchedTranslation);
    
        // Initialize the word options based on the fetched translation
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
  }, [jwtToken, language]);

  const selectWord = (selectedWord) => {
    const object = options.find((word) => word.word === selectedWord.word);

    if (object) {
      setSelectedWords([...selectedWords, object]);
      setOptions(options.filter((word) => word.id !== object.id));

    }
  };

  const removeWord = (removedWord) => {
    const object = selectedWords.find((word) => word.word === removedWord.word);

    if (object) {
      setSelectedWords(selectedWords.filter((word) => word.id !== object.id));
      setOptions([...options, object]);
    }
  };

  // Check if the user's sentence matches the target sentence
  const checkAnswer = () => {
    const userSentence = selectedWords
      .map((word) => word.word)
      .join(" ");

    if (userSentence === targetSentence) {
      console.log(noOfAttempts);
      endTest(1,noOfAttempts);
      incrementQuestionNumber();
      Alert.alert("Correct!", "You solved the puzzle!");
      console.log("Correct!");
    } else {
      setNoOfAttempts(noOfAttempts + 1);
      Alert.alert("Incorrect", "Try again!");
      console.log("Incorrect!");
      console.log("User sentence:", userSentence);
      console.log("Target sentence:", targetSentence);
    }
  };

  const sentenceParts = translation.split(" ").map((word, index) => {
    return word;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Arrange the words</Text>

      <View style={[styles.sentence, { marginTop: -10 }]}>
        {sentenceParts.map((word, index) => (
          <Text key={index} style={styles.wordSentences}>{word}{" "}</Text>
        ))}
      </View>

      <View style={[styles.sentenceContainer, { marginTop: -20 }]}>
        {options.map((word, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.word, { backgroundImage: 'linear-gradient(45deg, #4F1DAE, #7e3ffb, #9D6CFF)', }]}

            onPress={() => selectWord(word)} // Toggle selection
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
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sentence: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  sentenceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
  },
  selectedSentenceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    width: '100%',
    padding: 10,
    borderRadius: 8,
    gap: 5,
  },
  word: {
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
    borderWidth: 1,
    borderColor: '#7e3ffb',
    borderRadius: 8,
    padding: 10,
    margin: 5,
    height: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wordSentences: {
    fontSize: 15,
  },
  bottomContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    width: '100%',
  },
});

export default JumbledSentence;
