import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const JumbledSentence = () => {
    const [fillSentence, setFillSentence] = useState("");
    const [options, setOptions] = useState([]);
    const [answer, setAnswer] = useState("");
    const [text, setText] = useState("");
    const [selectedWord, setSelectedWord] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const feedbackTextStyle = {
      fontSize: 16,
      color: feedbackMessage === "Correct! You filled the blank correctly." ? "green" : "red",
      marginTop: 10,
  };

    const token = "eyJhbGciOiJIUzM4NCJ9.eyJpYXQiOjE3MzEwOTk3NDMsImV4cCI6MTczMTE4NjE0MywiYXV0aG9yaXRpZXMiOiJST0xFX1VTRVIiLCJlbWFpbCI6Imxhd2RhIn0.ziB-N0V29qECkCHzx_yF6hEUfYyZpHSuMOj4BBMBJZWBfWC8woHW1DKS45PLcBhr";

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await fetch(
                    'http://localhost:8080/question/generateQuestion?questionType=1&language=french',
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        }
                    }
                );
                const data = await response.json();
                setFillSentence(data.question); // Assuming API provides sentence with blank
                setOptions(data.options); // Assuming API provides options as an array
                setAnswer(data.answer); // Assuming API provides the correct answer
            } catch (error) {
                console.error("Error fetching question:", error);
            }
        };
        fetchQuestion();
    }, []);

    // Split sentence into left and right parts around the blank
    const [leftSentenceParts, rightSentenceParts] = fillSentence.split("____");
    const handleOptionSelect = (word) => {
        setText(word);
        setSelectedWord(word);
        console.log("Selected word:", word);
    };

    const checkAnswer = () => {
      if (selectedWord === answer) {
          setFeedbackMessage("Correct! You filled the blank correctly.");
      } else {
          setFeedbackMessage("Incorrect. Try again!");
      }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fill in the Blank</Text>
      <View style={styles.contentContainer}>
        <View style={styles.sentence}>
          <Text style={styles.wordSentences}>{leftSentenceParts}</Text>
          <View style={styles.underline}>
              {text !== "" && (
                  <TouchableOpacity style={styles.wordBox}>
                      <Text style={styles.wordText}>{text}</Text>
                  </TouchableOpacity>
              )}
          </View>
          <Text style={styles.wordSentences}>{rightSentenceParts}</Text>
        </View>
        <View>
          <Text style={{ fontSize: 15, fontStyle: 'italic' }}>Choose the correct option:</Text>
          <View style={styles.selectedSentenceContainer}>
              {options.map((option, index) => (
                  <TouchableOpacity 
                      key={index} 
                      style={styles.word} 
                      onPress={() => handleOptionSelect(option)}
                  >
                      <Text style={styles.buttonText}>{option}</Text>
                  </TouchableOpacity>
              ))}
          </View>
        </View>
        {/* Display feedback message in the center */}
        {feedbackMessage !== "" && (
            <Text style={feedbackTextStyle}>{feedbackMessage}</Text>
        )}
      </View>
      <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.button} onPress={checkAnswer}>
              <Text style={styles.buttonText}>Check Answer</Text>
          </TouchableOpacity>
      </View>
    </View>
);



};

// Define the styles here
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 16,
//         backgroundColor: '#f9f9f9',
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//         textAlign: 'center',
//     },
//     sentence: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         marginBottom: 20,
//         justifyContent: 'center',
//     },
//     wordSentences: {
//         fontSize: 18,
//         marginHorizontal: 2,
//     },
//     underline: {
//         borderBottomWidth: 1,
//         borderBottomColor: '#000',
//         marginHorizontal: 4,
//         minWidth: 50,
//     },
//     wordBox: {
//         padding: 4,
//     },
//     wordText: {
//         fontSize: 18,
//     },
//     selectedSentenceContainer: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         justifyContent: 'center',
//         marginVertical: 10,
//     },
//     word: {
//         backgroundColor: '#4F1DAE',
//         borderRadius: 5,
//         padding: 8,
//         margin: 5,
//     },
//     buttonText: {
//         color: '#fff',
//         fontSize: 16,
//     },
//     bottomContainer: {
//         marginTop: 20,
//         alignItems: 'center',
//     },
//     button: {
//         backgroundColor: '#4F1DAE',
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         borderRadius: 5,
//     },
// });
const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#f9f9f9',
  },
  title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
  },
  contentContainer: {
      flex: 1,
      justifyContent: 'center', // Centers feedback message vertically
      alignItems: 'center', // Centers feedback message horizontally
  },
  sentence: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 20,
      justifyContent: 'center',
  },
  wordSentences: {
      fontSize: 18,
      marginHorizontal: 2,
  },
  underline: {
      borderBottomWidth: 1,
      borderBottomColor: '#000',
      marginHorizontal: 4,
      minWidth: 50,
  },
  wordBox: {
      padding: 4,
  },
  wordText: {
      fontSize: 18,
  },
  selectedSentenceContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginVertical: 10,
  },
  word: {
      backgroundColor: '#4F1DAE',
      borderRadius: 5,
      padding: 8,
      margin: 5,
  },
  buttonText: {
      color: '#fff',
      fontSize: 16,
      textAlign: 'center',
  },
  bottomContainer: {
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingVertical: 10,
  },
  button: {
      backgroundColor: '#4F1DAE',
      paddingVertical: 10,
      width: '100%', // Makes button span the full width of the screen
      borderRadius: 5,
  },
});



export default JumbledSentence;
