import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import TextButton from './TextButton';
import * as API from '../utils/api';
import { TextInput } from 'react-native-gesture-handler';
import { white } from '../utils/colors';
import { connect } from 'react-redux';
import { addQuestion } from '../actions';

class NewQuestion extends React.Component {
  state = {
    title: '',
    answer: '',
    createPending: false,
  };

  handleTextChange = ({ param, text }) => {
    this.setState(() => ({
      [param]: text,
    }));
  };

  onChangeQuestion = (text) => this.handleTextChange({ param: 'title', text });
  onChangeAnswer = (text) => this.handleTextChange({ param: 'answer', text });

  onSubmit = () => {
    const { title, answer } = this.state;
    const { deckId, dispatch, navigation } = this.props;
    // update DB
    const qid = API.addQuestion({ deckId, title, answer });
    // update redux
    dispatch(addQuestion({ deckId, title, answer, qid }));
    // route to Deck view
    navigation.navigate('Dashboard');
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

const mapStateToProps = ({}, ownProps) => {
  return {
    deckId: ownProps.route.params.deckId,
  };
};

export default connect(mapStateToProps)(NewQuestion);
