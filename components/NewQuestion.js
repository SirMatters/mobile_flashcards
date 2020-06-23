import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import TextButton from './TextButton';
import { generateId } from '../utils/helpers';
import { TextInput } from 'react-native-gesture-handler';
import { white } from '../utils/colors';

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
      <KeyboardAvoidingView style={styles.container}>
        <Text style={[styles.title]}>Add New Question</Text>
        <View>
          <TextInput
            placeholder='Enter new question'
            onChangeText={(text) => this.onChangeQuestion(text)}
            style={styles.input}
            value={this.state.question}
          />
          <TextInput
            placeholder='Enter question answer'
            onChangeText={(text) => this.onChangeAnswer(text)}
            style={styles.input}
            value={this.state.answer}
          />
        </View>
        <TextButton
          style={[
            styles.button,
            { marginTop: 100, backgroundColor: 'black', color: 'white' },
          ]}
          disabled={this.state.question === '' || this.state.answer === ''}
          onPress={this.onSubmit}
        >
          Submit
        </TextButton>
      </KeyboardAvoidingView>
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
  },
  title: {
    fontSize: 30,
  },
  input: {
    backgroundColor: white,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
    margin: 5,
    width: 300,
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

export default NewQuestion;
