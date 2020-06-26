import { generateId } from './helpers';

export const fetchDecksData = () => ({
  '1': {
    id: '1',
    title: 'African Mamals',
    questions: [
      {
        id: 'q11',
        title: 'q11',
        answer: 'a11',
      },
      {
        id: 'q21',
        title: 'q21',
        answer: 'a21',
      },
    ],
  },
  '2': {
    id: '2',
    title: 'European Countries',
    questions: [
      {
        id: 'q12',
        title: 'q12',
        answer: 'a12',
      },
      {
        id: 'q22',
        title: 'q22',
        answer: 'a22',
      },
    ],
  },
});

export const createNewDeck = (title) => ({
  id: Date.now().toString(),
});

export const deleteDeck = (id) => {
  console.log('DB: deleted deck from db:', id);
};

export const addQuestion = ({ deckId, title, answer }) => {
  return generateId();
};
