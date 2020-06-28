import React from 'react';
import { Keyboard, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import TextButton from './TextButton';
import { white } from '../utils/colors';
import { addDeck } from '../actions';
import * as API from '../utils/api';
import { connect } from 'react-redux';

class NewDeck extends React.Component {
  state = {
    title: '',
  };

  handleTextChange = (text) => {
    this.setState(() => ({
      title: text,
    }));
  };

  handleSubmit = async () => {
    Keyboard.dismiss();
    const { dispatch, navigation } = this.props;
    // update db
    const { title } = this.state;
    // id is returned by an api
    const { id } = await API.createNewDeck(title);
    // update redux
    dispatch(addDeck({ title, id }));
    this.setState(() => ({
      title: '',
    }));
    // go back to deck screen
    navigation.navigate('Deck', { id });
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.title}>Create a new Quiz</Text>
        <TextInput
          placeholder={'Enter new Quiz title'}
          style={styles.input}
          onChangeText={(text) => this.handleTextChange(text)}
          value={this.state.title}
        />
        <TextButton
          style={[styles.button, { color: 'white', backgroundColor: 'black' }]}
          onPress={this.handleSubmit}
          disabled={this.state.title === ''}
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
    backgroundColor: white,
    paddingTop: 150,
    paddingBottom: 150,
    flexGrow: 1,
    flexShrink: 0,
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
    marginTop: 10,
    width: 300,
    minHeight: 35,
  },
  button: {
    textTransform: 'uppercase',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
    margin: 5,
    marginTop: 10,
    width: 200,
    fontSize: 17,
  },
});

const mapStateToProps = ({}, ownProps) => ({ ...ownProps });

export default connect(mapStateToProps)(NewDeck);
