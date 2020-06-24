import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TextButton from './TextButton';
import { gray } from '../utils/colors';

const Desk = ({ id, title, questions, navigation }) => {
  const qNum = questions ? questions.length : 0;

  const onDelete = () => {
    console.log('Deleting quiz id:', id);
  };

  const onGameStart = () => {
    navigation.navigate('Quiz', { id });
  };
  const onAddNew = () => {};

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: 150 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.stats}>{qNum} card(s)</Text>
      </View>
      <View style={{ paddingBottom: 150 }}>
        <TextButton
          style={[styles.button, { color: 'black' }]}
          onPress={onAddNew}
        >
          Add new
        </TextButton>
        <TextButton
          style={[styles.button, { color: 'white', backgroundColor: 'black' }]}
          onPress={onGameStart}
        >
          Start Quiz
        </TextButton>
        <TouchableOpacity onPress={onDelete}>
          <TextButton style={{ paddingTop: 15, color: 'red' }}>
            Delete Quiz
          </TextButton>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 30,
  },
  stats: {
    fontSize: 20,
    color: gray,
    textAlign: 'center',
  },
  button: {
    textTransform: 'uppercase',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
    margin: 5,
    width: 200,
    fontSize: 17,
  },
});

export default Desk;
