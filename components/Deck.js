import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TextButton from './TextButton';

const Desk = ({ id, title, questions }) => {
  const qNum = questions ? questions.length : 0;

  const onDelete = () => {
    console.log('Deleting quiz id:', id);
  };

  const onGameStart = () => {};
  const onAddNew = () => {};

  return (
    <View>
      <View>
        <Text>{title}</Text>
        <Text>{qNum} cards</Text>
      </View>
      <View>
        <TextButton onPress={onAddNew}>Add</TextButton>
        <TextButton onPress={onGameStart}>Start Quiz</TextButton>
      </View>
      <TouchableOpacity onPress={onDelete}>
        <Text>Delete Quiz</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Desk;
