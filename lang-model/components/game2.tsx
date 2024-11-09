import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../context/GlobalProvider'; 

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
    const [noOfAttempts, setNoOfAttempts] = useState(0);

    const { jwtToken, language, incrementQuestionNumber, endTest} = useAuth();

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8080/question/generateQuestion?questionType=1&language=${language}`,
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
    }, [jwtToken, language]);

    // Split sentence into left and right parts around the blank
    let leftSentenceParts = [];
    let rightSentenceParts = [];

    // Split the sentence into words based on spaces
    const words = fillSentence.split(" ");

    // Flag to know when to start adding to rightSentenceParts
    let foundUnderscore = false;

    // Loop through each word
    for (let word of words) {
    if (word.includes("_")) {
        // Start adding to the right part once an underscore is found
        foundUnderscore = true;
        continue;
    }
    if (foundUnderscore) {
        // Add to rightSentenceParts if we found an underscore
        rightSentenceParts.push(word + " ");
    } else {
        if (!foundUnderscore) {
            leftSentenceParts.push(word + " "); 
        }
        // Otherwise, add to leftSentenceParts
    }
    }
    const handleOptionSelect = (word) => {
        setText(word);
        setSelectedWord(word);
        console.log("Selected word:", word);
    };

    const checkAnswer = () => {
      if (selectedWord === answer) {
          console.log(noOfAttempts);
          endTest(1,noOfAttempts);
          incrementQuestionNumber();
          setFeedbackMessage("Correct! You filled the blank correctly.");
      } else {
          setNoOfAttempts(noOfAttempts + 1);
          setFeedbackMessage("Incorrect. Try again!");
      }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fill in the Blank</Text>
      <View style={styles.contentContainer}>
        <View style={styles.sentence}>
          <Text style={styles.wordSentences}>{leftSentenceParts}</Text>
           {options.length > 0 && <View style={styles.underline}>
              {text !== "" && (
                  <TouchableOpacity style={styles.wordBox}>
                      <Text style={styles.wordText}>{text}</Text>
                  </TouchableOpacity>
              )}
          </View>}
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
    underline: {
        borderBottomWidth: 2,
        borderBottomColor: '#778899',
        borderStyle: 'dotted',
        width: 170,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 20,
    },
    sentence: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
        width: '100%',
        padding: 10,
        borderRadius: 8,
        gap: 5,
        alignItems: 'flex-end', // Aligns items to the bottom in the row
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
      padding: 20,
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
      marginBottom: 20,
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
      backgroundImage: 'linear-gradient(45deg, #4F1DAE, #7e3ffb, #9D6CFF)'
    },
    selectedWord: {
      fontSize: 18,
      color: '#fff',
      backgroundColor: '#4F1DAE',
      padding: 10,
      margin: 5,
      borderRadius: 8,
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
        borderWidth: 1,
        borderColor: '#7e3ffb',
        borderRadius: 8,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginHorizontal: 5,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        marginBottom: 5,
    },
    wordText: {
        color: '#7e3ffb',
        fontSize: 13,
    }, 
    wordSentences: {
      fontSize: 15,
    }  
  });

export default JumbledSentence;