import React from 'react';
import { View, Text, StyleSheet, Alert, Animated } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TextButton from './TextButton';
import { gray } from '../utils/colors';
import { connect } from 'react-redux';
import { deleteDeck } from '../actions';
import * as API from '../utils/api';

class Deck extends React.Component {
  state = {
    opacity: new Animated.Value(0),
  };

  componentDidMount() {
    const { opacity } = this.state;
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    // Do not re-render unless
    const { deck } = nextProps;
    return deck !== undefined;
  }

  render() {
    console.log('Rendering Deck component');

    const { opacity } = this.state;

    const {
      deck: { id, title, questions },
      navigation,
      dispatch,
    } = this.props;

    const createEmptyDeckAlert = () =>
      Alert.alert(
        'Deck is empty',
        'Add new question cards to the deck to start quiz',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );

    const onDelete = async () => {
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
      <Animated.View style={[styles.container, { opacity }]}>
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
              questions.length === 0 ? styles.disabled : null,
            ]}
            onPress={
              questions.length === 0 ? createEmptyDeckAlert : onGameStart
            }
          >
            Start Quiz
          </TextButton>
          <TouchableOpacity onPress={onDelete}>
            <TextButton style={{ paddingTop: 15, color: 'red' }}>
              Delete Quiz
            </TextButton>
          </TouchableOpacity>
        </View>
      </Animated.View>
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
  disabled: {
    backgroundColor: gray,
    borderColor: gray,
  },
});

const mapStateToProps = (decks, ownProps) => {
  let deck = decks[ownProps.route.params.id];
  console.log('Passing info to connected Deck:', JSON.stringify(deck));
  return {
    deck,
  };
};
export default connect(mapStateToProps)(Deck);
