import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'French is one of only two languages spoken on all five continents, along with English.',
    translation: 'Français',
    source: 'https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'German is the official language in Germany, Austria, Liechtenstein, Luxembourg, and Switzerland.',
    translation: 'Deutsch',
    source: 'https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Spanish is the second most spoken language in the world: With around 485 million native speakers, Spanish is the second most spoken language in the world, after Mandarin.',
    translation: 'Español',
    source: 'https://upload.wikimedia.org/wikipedia/en/9/9a/Flag_of_Spain.svg'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d74',
    title: 'The Portuguese alphabet has 26 letters, the same as the English alphabet. However, the letters K, W, and Y were added in 2009 to help with foreign loanwords.',
    translation: 'Português',
    source: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Portugal.svg'
  }
];

const Item = ({ title, translation, source }) => (
  <View style={styles.card}>
    <View style={styles.content}>
      <Image source={{ uri: source }} style={styles.image} />
      <Text style={styles.translation}>{translation}</Text>
      <Text style={styles.description}>{title}</Text>
    </View>

    {/* Wave Backgrounds */}
    <View style={styles.wave1}>
      <Svg height="100" width="100%" viewBox="0 0 1440 320">
        <Path
          fill="#5907f8"
          fillOpacity="0.3"
          d="M0,160L60,176C120,192,240,224,360,240C480,256,600,256,720,218.7C840,181,960,107,1080,106.7C1200,107,1320,181,1380,218.7L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        />
      </Svg>
    </View>

    <View style={styles.wave2}>
      <Svg height="100" width="100%" viewBox="0 0 1440 320">
        <Path
          fill="#e7e0fb"
          fillOpacity="0.6"
          d="M0,224L60,202.7C120,181,240,139,360,128C480,117,600,139,720,165.3C840,192,960,224,1080,229.3C1200,235,1320,213,1380,202.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        />
      </Svg>
    </View>
  </View>
);

const Home = () => (
  <View style={styles.container}>
    <FlatList
      data={DATA}
      renderItem={({ item }) => (
        <Item
          title={item.title}
          source={item.source}
          translation={item.translation}
        />
      )}
      keyExtractor={item => item.id}
    />
  </View>
);

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingVertical: 20,
  },
  card: {
    position: 'relative',
    backgroundColor: '#4F1DAE',
    borderRadius: 12,
    margin: 16,
    padding: 20,
    overflow: 'hidden',
  },
  content: {
    alignItems: 'center',
    zIndex: 2,
  },
  image: {
    width: 150,
    height: 99,
    borderRadius: 8,
    marginBottom: 10,
  },
  translation: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginVertical: 10,
  },
  description: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  wave1: {
    position: 'absolute',
    bottom: -10,
    left: 0,
    width: '100%',
    zIndex: 1,
  },
  wave2: {
    position: 'absolute',
    bottom: -30,
    left: 0,
    width: '100%',
    zIndex: 0,
  },
});

export default Home;
