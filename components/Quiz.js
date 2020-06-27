import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getNoQuizValue } from '../utils/helpers';
import TextButton from './TextButton';
import { gray } from '../utils/colors';
import QuizResult from './QuizResult';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { NOTIFICATION_KEY } from '../utils/helpers';
import { white } from '../utils/colors';
import { FontAwesome } from '@expo/vector-icons';

class Quiz extends React.Component {
  state = {
    renderedCard: 0,
    showAnswer: false,
    gameScore: 0,
  };

  handleShow = () => {
    this.setState((currState) => ({
      showAnswer: !currState.showAnswer,
    }));
  };

  handleRestart = () => {
    this.setState(() => ({
      renderedCard: 0,
      showAnswer: false,
      gameScore: 0,
    }));
  };

  handleAnswer = (answer) => {
    this.setState((currState) => ({
      renderedCard: currState.renderedCard + 1,
      gameScore: currState.gameScore + (answer ? 1 : 0),
      showAnswer: false,
    }));
  };

  render() {
    const { deck, navigation } = this.props;
    const question = deck.questions[this.state.renderedCard];

    if (deck.questions.length === 0) {
      return <Text>{getNoQuizValue()}</Text>;
    }

    if (this.state.renderedCard === deck.questions.length) {
      // set today's date for last passed within async sotrage
      AsyncStorage.setItem(NOTIFICATION_KEY, new Date().toLocaleDateString());

      return (
        <QuizResult
          onRestart={this.handleRestart}
          navigation={navigation}
          deck={deck}
          score={this.state.gameScore}
        />
      );
    }

    return (
      <View style={{ backgroundColor: white, minHeight: 600 }}>
        <Text style={styles.cardNumber}>
          {this.state.renderedCard + 1}/{deck.questions.length}
        </Text>
        <View style={[styles.container]}>
          <View>
            <Text style={[styles.title, { textAlign: 'center' }]}>
              {question.title}
            </Text>
            {this.state.showAnswer && (
              <Text style={{ color: gray, textAlign: 'center' }}>
                {question.answer}
              </Text>
            )}
          </View>
          <View>
            {this.state.showAnswer && (
              <View style={styles.row}>
                <TextButton
                  onPress={() => {
                    this.handleAnswer(true);
                  }}
                  style={[styles.answerButton, { borderColor: 'green' }]}
                >
                  <FontAwesome
                    name='check'
                    size={30}
                    style={{ color: 'green' }}
                  />
                </TextButton>
                <TextButton
                  onPress={() => {
                    this.handleAnswer(false);
                  }}
                  style={[styles.answerButton, { borderColor: 'red' }]}
                >
                  <FontAwesome
                    name='close'
                    size={30}
                    style={{ color: 'red' }}
                  />
                </TextButton>
              </View>
            )}
            {!this.state.showAnswer && (
              <TextButton
                style={[
                  styles.button,
                  { color: 'white', backgroundColor: 'black' },
                ]}
                onPress={this.handleShow}
              >
                Show answer
              </TextButton>
            )}
          </View>
          <View>
            <Text style={{ textAlign: 'center', fontSize: 20 }}>
              Your score
            </Text>
            <View style={styles.row}>
              <Text style={{ color: 'green', fontSize: 20 }}>
                {this.state.gameScore}
              </Text>
              <Text style={{ fontSize: 20 }}>/</Text>
              <Text style={{ color: 'red', fontSize: 20 }}>
                {this.state.renderedCard - this.state.gameScore}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: white,
    paddingTop: 150,
    paddingBottom: 150,
    flexGrow: 1,
    minHeight: 600,
  },
  title: {
    fontSize: 30,
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
  answerButton: {
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
    width: 70,
    margin: 5,
    minHeight: 50,

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: 200,
    maxHeight: 50,
  },
  cardNumber: {
    width: 300,
    color: gray,
    textAlign: 'right',
    marginTop: 10,
    backgroundColor: white,
  },
  userScore: {},
});

const mapStateToProps = (decks, ownProps) => ({
  deck: decks[ownProps.route.params.id],
  navigation: ownProps.navigation,
});

export default connect(mapStateToProps)(Quiz);
