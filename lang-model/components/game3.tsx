import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useAuth } from '../context/GlobalProvider'; 

const JumbledSentence = () => {
    const [passage, setPassage] = useState("");
    const [options, setOptions] = useState([]);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [selectedWord, setSelectedWord] = useState(null);
    const [feedbackColors, setFeedbackColors] = useState({});
    const [noOfAttempts, setNoOfAttempts] = useState(0);

    const { jwtToken, language, incrementQuestionNumber, endTest} = useAuth();

    useEffect(() => {
        if (jwtToken && language) {
            fetchQuestionData(); // Call fetch function when jwtToken or language changes
        }
    }, [jwtToken, language]);

    const fetchQuestionData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/question/generateQuestion', {
                params: { questionType: "2", language: `${language}` },
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                }
            });
            const data = response.data;
            setPassage(data.passage);
            setQuestion(data.question);
            setAnswer(data.answer);
            setOptions(data.options);
            setFeedbackColors({});
        } catch (error) {
            console.error("Error fetching question data:", error);
        }
    };

    const handleOptionSelect = (option) => {
        setSelectedWord(option);
        const isCorrect = option === answer;
      
        // Set feedback color based on correctness
        setFeedbackColors((prevColors) => ({
          ...prevColors,
          [option]: isCorrect
            ? 'linear-gradient(to right, #24e024, #03fc03)' // Green gradient for correct answer
            : 'linear-gradient(to right, #a31f1f ,#ff0000)', // Red gradient for wrong answer
        }));
      
        if (isCorrect) {
            incrementQuestionNumber();
            console.log(noOfAttempts);
            endTest(1,noOfAttempts);
          // Pause for 1 second before calling incrementQuestionNumber
        }
        else{
          setNoOfAttempts(noOfAttempts + 1);
        }
      };
      

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Fill in the Blank</Text>

            <View style={styles.sentence}>
                {/* Render the dynamically fetched passage */}
                {passage.split(" ").map((word, index) => (
                    <Text key={index} style={styles.wordSentences}>{word}{" "}</Text>
                ))}
            </View>

            <View style={{ marginTop: -10 }}>
                <Text>{question}</Text>
            </View>

            <View style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 15, fontStyle: 'italic' }}>Choose the correct option:</Text>
                <View style={styles.selectedSentenceContainer}>
                    {options.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.word, 
                                { backgroundImage: feedbackColors[option] }
                            ]}
                            onPress={() => handleOptionSelect(option)}
                        >
                            <Text style={styles.buttonText}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
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
      backgroundImage: 'linear-gradient(45deg, #4F1DAE, #7e3ffb, #9D6CFF)',
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
