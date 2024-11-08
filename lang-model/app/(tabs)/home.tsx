import React from 'react';
import {View, FlatList, StyleSheet, Text, StatusBar, Image, Linking, TouchableOpacity,  Dimensions} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import CountryFlag from 'react-native-country-flag';
import { sortRoutes } from 'expo-router/build/sortRoutes';
import "@/assets/images/Flag-France.webp";
import "@/assets/images/Flag-Germany.webp";
import "@/assets/images/Flag-Spain.webp";
import "@/assets/images/Flag-Portugal.webp";
import Svg, { Path } from 'react-native-svg';

const screenWidth = Dimensions.get('window').width;

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'French is one of only two languages spoken on all five continents, along with English.',
    translation: 'Français',
    source: require('@/assets/images/Flag-France.webp'),
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'German is the official language in Germany, Austria, Liechtenstein, Luxembourg, and Switzerland.',
    translation: 'Deutsch',
    source : require('@/assets/images/Flag-Germany.webp'),
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Spanish is the second most spoken language in the world: With around 485 million native speakers, Spanish is the second most spoken language in the world, after Mandarin.',
    translation: 'Español',
    source : require('@/assets/images/Flag-Spain.webp'),
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d74',
    title: 'The Portuguese alphabet has 26 letters, the same as the English alphabet. However, the letters K, W, and Y were added in 2009 to help with foreign loanwords.',
    translation: 'Português',
    source : require('@/assets/images/Flag-Portugal.webp'),
  }
];

const Item = ({title, source, translation}) => (
    <View style={styles1.container} className='rounded-lg py-5'>
      <View style={styles1.content}>
        <Image source={source} className='rounded-md' style={{width: 150, height: 99}}/>
        <Text style={styles1.title}>{translation}</Text>
        <Text style={styles1.description}>{title}</Text>
      </View>

      {/* Wave Backgrounds */}
      <View style={styles1.wave1}>
        <Svg height="200" width="100%" viewBox="0 0 1440 320">
          <Path
            fill="#5907f8"
            fillOpacity="0.3"
            d="M0,160L60,176C120,192,240,224,360,240C480,256,600,256,720,218.7C840,181,960,107,1080,106.7C1200,107,1320,181,1380,218.7L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </Svg>
      </View>

      <View style={styles1.wave2}>
        <Svg height="200" width="100%" viewBox="0 0 1440 320">
          <Path
            fill="#e7e0fb"
            fillOpacity="0.6"
            d="M0,224L60,202.7C120,181,240,139,360,128C480,117,600,139,720,165.3C840,192,960,224,1080,229.3C1200,235,1320,213,1380,202.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </Svg>
      </View>
    </View>
);


const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} source ={item.source} translation={item.translation} />}
        keyExtractor={item => item.id}
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
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'linear-gradient(180deg, #4F1DAE, #9D6CFF)',
    marginVertical: 8,
    marginHorizontal: 16,
  },
  content: {
    maxWidth: 600,
    zIndex: 2,
    alignItems: 'center',
  },
  breadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 20,
    marginBottom: 20,
  },
  breadcrumbText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
  breadcrumbSeparator: {
    color: '#ddd',
    marginHorizontal: 5,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    lineHeight: 44,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 7,
    marginLeft: 10,
  },
  wave1: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  wave2: {
    position: 'absolute',
    bottom: -30,
    width: '100%',
  },
});

export default App;