import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getNoQuizValue } from '../utils/helpers';
import { gray } from '../utils/colors';

const dummyData = [
  {
    id: '1',
    title: 'African mamals',
    questions: [
      { title: 'q11', answer: 'a11' },
      { title: 'q12', answer: 'a12' },
    ],
  },
  {
    id: '2',
    title: 'Egyptian mythology',
    questions: [{ title: 'q21', answer: 'a21' }],
  },
  {
    id: '3',
    title: 'Pain & gain',
    questions: [{ title: 'q21', answer: 'a21' }],
  },
];

class Dashboard extends React.Component {
  listItem = ({ title, questions, id }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          this.props.navigation.navigate('Deck', { id });
        }}
      >
        <View style={styles.row}>
          <Text style={styles.deckTitle}>{title}</Text>
          <Text style={styles.deckStats}>{questions.length} question(s)</Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderEmptyList = () => (
    <View>
      <Text>{getNoQuizValue()}</Text>
    </View>
  );
  render() {
    return (
      <FlatList
        contentContainerStyle={styles.containder}
        data={dummyData}
        renderItem={({ item }) => this.listItem(item)}
        ListEmptyComponent={this.renderEmptyList}
      />
    );
  }
}

const styles = StyleSheet.create({
  containder: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  item: {
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    margin: 2,
    minWidth: 300,
    maxWidth: 300,
    minHeight: 50,
    padding: 5,
  },
  deckTite: {
    maxWidth: 200,
  },
  deckStats: {
    maxWidth: 100,
    color: gray,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default Dashboard;
