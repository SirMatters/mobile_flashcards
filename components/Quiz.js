import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getNoQuizValue } from '../utils/helpers';
import TextButton from './TextButton';
import { gray } from '../utils/colors';
import QuizResult from './QuizResult';
import { connect } from 'react-redux';

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

  handleAnswer = (answer) => {
    this.setState((currState) => ({
      renderedCard: currState.renderedCard + 1,
      gameScore: currState.gameScore + (answer ? 1 : 0),
      showAnswer: false,
    }));
  };

  render() {
    const { deck } = this.props;
    const question = deck.questions[this.state.renderedCard];

    if (deck.questions.length === 0) {
      return <Text>{getNoQuizValue()}</Text>;
    }

    if (this.state.renderedCard === deck.questions.length) {
      return <QuizResult deck={deck} score={this.state.gameScore} />;
    }

    return (
      <View>
        <Text style={styles.cardNumber}>
          {this.state.renderedCard + 1}/{deck.questions.length}
        </Text>
        <View style={styles.container}>
          <Text style={styles.title}>{question.title}</Text>
          {this.state.showAnswer && <Text>{question.answer}</Text>}
          <View>
            {this.state.showAnswer && (
              <View style={styles.row}>
                <TextButton
                  onPress={() => {
                    this.handleAnswer(true);
                  }}
                  style={[styles.answerButton]}
                >
                  Yes
                </TextButton>
                <TextButton
                  onPress={() => {
                    this.handleAnswer(false);
                  }}
                  style={[styles.answerButton]}
                >
                  No
                </TextButton>
              </View>
            )}
            <TextButton
              style={[
                styles.button,
                { color: 'white', backgroundColor: 'black' },
              ]}
              // disabled={this.state.showAnswer}
              onPress={this.handleShow}
            >
              Show answer
            </TextButton>
          </View>
          <View>
            <Text>{this.state.gameScore}</Text>
            <Text>/</Text>
            <Text>{this.state.renderedCard - this.state.gameScore}</Text>
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
    backgroundColor: '#F5FCFF',
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
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200,
    maxHeight: 50,
  },
  answerButton: {
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
    width: 70,
    marginBottom: 5,

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardNumber: {
    width: 300,
    color: gray,
    textAlign: 'right',
    marginTop: 10,
  },
  userScore: {},
});

const mapStateToProps = (decks, ownProps) => ({
  deck: decks[ownProps.route.params.id],
});

export default connect(mapStateToProps)(Quiz);
