import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useAuth } from '../../context/GlobalProvider'; 

const JumbledSentence = () => {
    const [passage, setPassage] = useState("");
    const [options, setOptions] = useState([]);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [selectedWord, setSelectedWord] = useState(null);
    const [feedbackColors, setFeedbackColors] = useState({});

    useEffect(() => {
        // Fetch data from API on component mount
        fetchQuestionData();
    }, []);

    const { jwtToken } = useAuth();

    const fetchQuestionData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/question/generateQuestion', {
                params: { questionType: "2", language: "english" },
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
            [option]: isCorrect ? 'green' : 'red',
        }));
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
                                { backgroundColor: feedbackColors[option] || '#4F1DAE' }
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
    container: { flex: 1, padding: 20, alignItems: 'center', backgroundColor: '#f5f5f5' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    sentence: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 },
    selectedSentenceContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20, gap: 5 },
    word: { fontSize: 16, color: '#fff', padding: 10, margin: 5, borderRadius: 8 },
    buttonText: { fontSize: 16, color: '#fff' },
    wordSentences: { fontSize: 15 },
});

export default JumbledSentence;
