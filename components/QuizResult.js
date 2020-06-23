import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TextButton from './TextButton';
import { gray } from '../utils/colors';

const QuizResult = ({ deck, score }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Quiz</Text>
        <Text style={styles.title}>{deck.title}</Text>
      </View>
      <View>
        <Text style={styles.userScore}>Your score is</Text>
        <View style={styles.row}>
          <Text style={[styles.userScore, { color: 'green' }]}>{score}</Text>
          <Text style={styles.userScore}>of</Text>
          <Text style={styles.userScore}>{deck.questions.length}</Text>
        </View>
      </View>
      {score / deck.questions.length >= 0.75 ? (
        <Text style={styles.cheer}>Good job!</Text>
      ) : null}
      <TextButton
        style={[styles.button, { backgroundColor: 'black', color: 'white' }]}
      >
        Return to Deck
      </TextButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 50,
    paddingBottom: 150,
    flexGrow: 1,
  },
  header: {
    fontSize: 35,
    textAlign: 'center',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
  },
  button: {
    textTransform: 'uppercase',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
    width: 200,
    fontSize: 17,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: 200,
    maxHeight: 50,
  },
  userScore: {
    fontSize: 25,
    textAlign: 'center',
    margin: 5,
  },
  cheer: {
    fontSize: 30,
    color: 'green',
  },
});

export default QuizResult;
