import React from 'react';
import { View, FlatList, StyleSheet, Text, StatusBar, Dimensions } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { GiSpeaker } from "react-icons/gi";
import { G } from 'react-native-svg';

const DATA = [
    {id: '1', title: 'A', pronounciation : 'aaa'}
    ,{id: '2', title: 'B', pronounciation : 'bey'}
    ,{id: '3', title: 'C', pronounciation : 'cey'}
    ,{id: '4', title: 'D', pronounciation : 'dey'}
    ,{id: '5', title: 'E', pronounciation : 'ey'}
    ,{id: '6', title: 'F', pronounciation : 'aef'}
    ,{id: '7', title: 'G', pronounciation : 'ghay'}
    ,{id: '8', title: 'H', pronounciation : 'ash'}
    ,{id: '9', title: 'I', pronounciation : 'ey'}
    ,{id: '10', title: 'J', pronounciation : 'ji'}
    ,{id: '11', title: 'K', pronounciation : 'ka'}
    ,{id: '12', title: 'L', pronounciation : 'el'}
    ,{id: '13', title: 'M', pronounciation : 'em'}
    ,{id: '14', title: 'N', pronounciation : 'en'}
    ,{id: '15', title: 'O', pronounciation : 'oh'}
    ,{id: '16', title: 'P', pronounciation : 'pey'}
    ,{id: '17', title: 'Q', pronounciation : 'que'}
    ,{id: '18', title: 'R', pronounciation : 'err'}
    ,{id: '19', title: 'S', pronounciation : 'es'}
    ,{id: '20', title: 'T', pronounciation : 'tey'}    
    ,{id: '21', title: 'U', pronounciation : 'oo'}    
    ,{id: '22', title: 'V', pronounciation : 've'}
    ,{id: '23', title: 'W', pronounciation : 'doubbel-way'}
    ,{id: '24', title: 'X', pronounciation : 'ex'}
    ,{id: '25', title: 'Y', pronounciation : 'ee-greek'}
    ,{id: '26', title: 'Z', pronounciation : 'zed'}
];

const screenWidth = Dimensions.get('window').width;
const itemSize = screenWidth / 3 - 16; // Flexible width based on screen width (3 items per row with spacing)

const Item = ({ title, prounciation }) => (
  <View className = 'rounded-md' style={[styles.item, { width: itemSize, height: itemSize, boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }] }>
    <View>
        <GiSpeaker style={styles.pronounciationIcon} />
    </View>
    <Text style={styles.title}>{title}</Text>
    <View className='flex flex-row justify-center items-center gap-3' style={{width: '100%'}}>
        <View style={styles.pronounciationContainer}>
        <Text style={styles.pronounciation}>{prounciation}</Text>
        </View>
    </View>
  </View>
);

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item title={item.title}  prounciation={item.pronounciation}/>}
        keyExtractor={(item) => item.id}
        numColumns={Math.floor(screenWidth / itemSize)} // Dynamically set columns based on screen width
      />
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundImage: 'linear-gradient(45deg, #4F1DAE, #7e3ffb, #9D6CFF)',
    padding: 10,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
    lineHeight: 44,
    textAlign: 'center',
  },
  pronounciationContainer: {
    borderBottomWidth: 3,
    borderBottomColor: '#fff',
    borderStyle: 'dotted',
  },
  pronounciation: {
    fontSize: 12,
    color: '#fff',
    paddingBottom: 2,
  },
  pronounciationIcon: {
    color: '#fff',
    fontSize: 20,
  }
});

export default App;
