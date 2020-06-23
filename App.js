import * as React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import Dashboard from './components/Dashboard';
import Deck from './components/Deck';
import NewQuestion from './components/NewQuestion';
import Quiz from './components/Quiz';

const dummyData = [
  {
    id: 1,
    title:
      'Quiz 1adfasd fasdhflkjashdlkf haskdf ;asdjfa;skdfj a;sdhflkjashdf;kjash',
    questions: [
      { title: 'q11', answer: 'a11' },
      { title: 'q21', answer: 'a21' },
      { title: 'q31', answer: 'a31' },
      { title: 'q41', answer: 'a41' },
    ],
    // questions: [],
  },
  {
    id: 2,
    title: 'Quiz 2',
    questions: [{ title: 'q21', answer: 'a21' }],
  },
];

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar />
      {/* <Dashboard /> */}
      {/* <Deck {...dummyData[0]} /> */}
      {/* <NewQuestion /> */}
      <Quiz deck={dummyData[0]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
