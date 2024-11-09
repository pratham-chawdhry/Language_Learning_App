import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import GameOne from '../../components/game1.tsx'
import GameTwo from '../../components/game2.tsx'
import GameThree from '../../components/game3.tsx'
import GameFour from '../../components/game4.tsx'
import {useAuth} from '../../context/GlobalProvider';


export default function learn() {
  const { questionNumber } = useAuth();

  const [gameNumber, setGameNumber] = React.useState(1);

  useEffect(() => {
    setGameNumber(Math.floor(Math.random() * 2) + 1);
  }, [questionNumber]);

  const games = [
    // <GameOne />,
    <GameTwo />,
    <GameThree />,
    // <GameFour />,
  ];

  return (
    <>
      {games[gameNumber - 1]}
    </>
  )
}
