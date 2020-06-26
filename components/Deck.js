import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TextButton from './TextButton';
import { gray } from '../utils/colors';
import { connect } from 'react-redux';
import { deleteDeck } from '../actions';
import * as API from '../utils/api';

class Deck extends React.Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    // Do not re-render unless
    const { id } = nextProps.deck;
    return id !== undefined;
  }

  render() {
    const {
      deck: { id, title, questions },
      navigation,
      dispatch,
    } = this.props;

    const onDelete = () => {
      console.log(id);
      // update DB
      API.deleteDeck(id);
      // update redux
      dispatch(deleteDeck(id));
      // redirect to Dashboard
      navigation.goBack();
    };

    const onGameStart = () => {
      navigation.navigate('Quiz', { id });
    };
    const onAddNew = () => {
      navigation.navigate('NewQuestion', { deckId: id });
    };

    return (
      <View style={styles.container}>
        <View style={{ paddingTop: 150 }}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.stats}>{questions.length} card(s)</Text>
        </View>
        <View style={{ paddingBottom: 150 }}>
          <TextButton
            style={[styles.button, { color: 'black' }]}
            onPress={onAddNew}
          >
            Add new
          </TextButton>
          <TextButton
            style={[
              styles.button,
              { color: 'white', backgroundColor: 'black' },
            ]}
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
  }
}

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

const mapStateToProps = (decks, ownProps) => {
  deck = decks[ownProps.route.params.id];
  return {
    deck,
  };
};
export default connect(mapStateToProps)(Deck);
