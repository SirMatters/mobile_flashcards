import { generateId } from './helpers';
import AsyncStorage from '@react-native-community/async-storage';

const DATA_STORAGE_KEY = 'FlashCards:data';

const dummyData = {
  '1': {
    id: '1',
    title: 'African Mamals',
    questions: [
      {
        id: 'q11',
        title: 'Who is the king of savanna?',
        answer: 'Lion',
      },
      {
        id: 'q21',
        title: 'Was Nalla a lion or a tiger',
        answer: 'Lion',
      },
    ],
  },
  '2': {
    id: '2',
    title: 'European Countries',
    questions: [
      {
        id: 'q12',
        title: 'What is the most catolic country in Europe',
        answer: 'Vatican',
      },
      {
        id: 'q22',
        title: 'Which country a term "Brexit" refers to',
        answer: 'Great Britain',
      },
    ],
  },
};

export const setDummyData = async (data) => {
  console.log('Setting up dummy data to DB:', data);
  await AsyncStorage.setItem(
    DATA_STORAGE_KEY,
    JSON.stringify(data)
  ).catch((err) => console.log('Err setting up dummy data to db', err));
};

export const fetchDecksData = async () => {
  const data = JSON.parse(await AsyncStorage.getItem(DATA_STORAGE_KEY));
  console.log('Fetched data from DB is empty:', Object.keys(data).length === 0);
  if (Object.keys(data).length === 0) {
    await setDummyData(dummyData);
    return dummyData;
  }

  return data;
};

export const createNewDeck = async (title) => {
  const data = JSON.parse(await AsyncStorage.getItem(DATA_STORAGE_KEY));
  const id = generateId();
  data[id] = { id, title, questions: [] };
  AsyncStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(data)).catch((err) =>
    console.warn('Error adding a deck to DB:', err)
  );
  return { id };
};

export const deleteDeck = async (id) => {
  console.log('DB: deleted deck from db:', id);
  let data = JSON.parse(await AsyncStorage.getItem(DATA_STORAGE_KEY));
  data[id] = {};
  delete data[id];
  await AsyncStorage.setItem(
    DATA_STORAGE_KEY,
    JSON.stringify(data)
  ).catch((err) => console.log('Error deleting a deck from DB:', err));
};

export const addQuestion = async ({ deckId, title, answer }) => {
  let data = JSON.parse(await AsyncStorage.getItem(DATA_STORAGE_KEY));
  const qid = generateId();
  data[deckId] = {
    ...data[deckId],
    questions: [...data[deckId].questions, { id: qid, title, answer }],
  };
  AsyncStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(data)).catch((err) =>
    console.warn('Error adding a question to DB:', title)
  );
  return qid;
};
