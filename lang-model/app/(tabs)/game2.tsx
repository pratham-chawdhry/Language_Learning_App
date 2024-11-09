import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../../context/GlobalProvider'; 

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

    const { jwtToken } = useAuth();

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await fetch(
                    'http://localhost:8080/question/generateQuestion?questionType=1&language=french',
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${jwtToken}`,
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
});



export default JumbledSentence;
