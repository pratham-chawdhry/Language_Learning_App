import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

// Fill-in sentence with blanks (____)
let fillSentence = "تشتهر فرنسا بثقافتها الغنية ومأكولاتها اللذيذة ومعالمها التاريخية. من بين أشهر معالمها برج إيفل في باريس وجبل القديس ميشيل في نورماندي.";
let options = [
  "في باريس",  
  "في نورماندي", 
  "في نيويورك", 
  "في مارسيليا",
];
let question = "أين يقع برج إيفل؟";

const JumbledSentence = () => {
    const [text,setText] = useState("");
    let flag = true;
    let leftString = "";
    let rightString = "";

    // Split sentence by spaces and split at the first occurrence of a blank
    const sentenceParts = fillSentence.split(" ").map((word, index) => {
      // Add to leftString until the blank word is found
      return word;
    });

    // Split left and right strings into array parts
    const [leftSentenceParts, setLeftSentenceParts] = useState(leftString.trim().split(" "));
    const [rightSentenceParts, setRightSentenceParts] = useState(rightString.trim().split(" "));

    // Track selected word to fill in the blank
    const [selectedWord, setSelectedWord] = useState(null);

    const handleOptionSelect = (word) => {
      setText(word);
    };

    const checkAnswer = () => {
      if (selectedWord === "étudiants") {
        Alert.alert("Correct!", "You filled the blank correctly.");
      } else {
        Alert.alert("Incorrect", "Try again!");
      }
    };

    return (
        // <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Fill in the Blank</Text>

          <View style = {styles.sentence}>

            {
              sentenceParts.map((word, index) => (
                <Text key={index} style={styles.wordSentences}>{word}{" "}</Text>
              ))
            }
           </View>

           <View style = {{marginTop: -10}}>
             <Text>{question}</Text>
            </View>

           <View style = {{marginTop: 20}}>
                <Text style = {{fontSize: 15, fontStyle: 'italic'}}>Choose the correct option: </Text>
                <View style={styles.selectedSentenceContainer} className='flex justify-center '>
                {
                    options.map((option, index) => (
                        <TouchableOpacity key={index} style={[styles.word,{backgroundImage: 'linear-gradient(45deg, #4F1DAE, #7e3ffb, #9D6CFF)',}]} onPress={() => handleOptionSelect(option)}>
                            <Text style={styles.buttonText}>{option}</Text>
                        </TouchableOpacity>
                    ))
                }
                </View>
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
    underline: {
        borderBottomWidth: 2,
        borderBottomColor: '#778899',
        borderStyle: 'dotted',
        width: 170,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
