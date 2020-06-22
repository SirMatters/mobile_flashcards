import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import TextButton from './TextButton';
import { generateId } from '../utils/helpers';
import { TextInput } from 'react-native-gesture-handler';

class NewQuestion extends React.Component {
  state = {
    question: '',
    answer: '',
    createPending: false,
  };

  handleTextChange = ({ param, text }) => {
    this.setState(() => ({
      [param]: text,
    }));
  };

  onChangeQuestion = (text) =>
    this.handleTextChange({ param: 'question', text });
  onChangeAnswer = (text) => this.handleTextChange({ param: 'answer', text });

  onSubmit = () => {
    const { question, answer } = this.state;
    const { quizId } = this.props;
    // TODO: should be done within an action by an api
    const id = generateId();
    // update DB
    // update redux
    // route to Deck view
    console.log(`Adding question ${question} with id ${id} to quiz ${quizId}`);
  };

  render() {
    return (
      <KeyboardAvoidingView>
        <Text>New Question</Text>
        <TextInput
          onChangeText={(text) => this.onChangeQuestion(text)}
          style={style.input}
          value={this.state.question}
        />
        <TextInput
          onChangeText={(text) => this.onChangeAnswer(text)}
          style={style.input}
          value={this.state.answer}
        />
        <TextButton
          disabled={this.state.question === '' || this.state.answer === ''}
          onPress={this.onSubmit}
        >
          Submit
        </TextButton>
      </KeyboardAvoidingView>
    );
  }
}

const style = StyleSheet.create({
  input: {
    backgroundColor: 'lightskyblue',
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
  },
});

export default NewQuestion;
