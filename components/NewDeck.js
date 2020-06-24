import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import TextButton from './TextButton';
import { white } from '../utils/colors';

class NewDeck extends React.Component {
  state = {
    quizTitle: '',
  };

  handleTextChange = (text) => {
    this.setState(() => ({
      quizTitle: text,
    }));
  };

  onSubmit = () => {
    // go back to home screen
    // update redux
    // update db
  };

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.formContainer}>
          <Text style={styles.title}>Create a new Quiz</Text>
          <TextInput
            placeholder={'Enter new Quiz title'}
            style={styles.input}
            onChangeText={(text) => this.handleTextChange(text)}
          />
          <TextButton
            style={[
              styles.button,
              { color: 'white', backgroundColor: 'black' },
            ]}
            onPress={this.onSubmit}
          >
            Submit
          </TextButton>
        </KeyboardAvoidingView>
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
  },
  formContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
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
    marginTop: 50,
    width: 300,
  },
  button: {
    textTransform: 'uppercase',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
    margin: 5,
    marginTop: 50,
    width: 200,
    fontSize: 17,
  },
});

export default NewDeck;
