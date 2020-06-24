export const ADD_DECK = 'ADD_DECK';
export const DELETE_DECK = 'DELETE_DECK';
export const RECEIVE_DECKS = 'RECEIVE_DECKS';

export const addDeck = ({ title, id }) => ({
  type: ADD_DECK,
  title,
  id,
});

export const deleteDeck = (id) => ({
  type: DELETE_DECK,
  id,
});

export const receiveDecks = (decks) => ({
  type: RECEIVE_DECKS,
  decks,
});
