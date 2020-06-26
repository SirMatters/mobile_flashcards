import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getNoQuizValue } from '../utils/helpers';
import { gray } from '../utils/colors';
import { fetchDecksData } from '../utils/api';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions';

class Dashboard extends React.Component {
  componentDidMount() {
    const decks = fetchDecksData();
    const { dispatch } = this.props;
    dispatch(receiveDecks(decks));
  }

  listItem = ({ title, questions, id }) => {
    let qNum = questions ? questions.length : 0;
    return (
      <TouchableOpacity
        key={id}
        style={styles.item}
        onPress={() => {
          this.props.navigation.navigate('Deck', { id });
        }}
      >
        <View style={styles.row}>
          <Text style={styles.deckTitle}>{title}</Text>
          <Text style={styles.deckStats}>{qNum} question(s)</Text>
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
    const { decks } = this.props;
    return (
      <FlatList
        contentContainerStyle={[
          styles.containder,
          { backgroundColor: 'white' },
        ]}
        data={Object.values(decks)}
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

const mapStateToProps = (decks) => ({ decks });

export default connect(mapStateToProps)(Dashboard);
