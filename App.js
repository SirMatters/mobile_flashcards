import * as React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import Dashboard from './components/Dashboard';
import Deck from './components/Deck';
import NewQuestion from './components/NewQuestion';

const dummyData = [
  {
    id: 1,
    title: 'Quiz 1',
    questions: [{ title: 'q11', answer: 'a11' }],
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
      <Dashboard />
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
