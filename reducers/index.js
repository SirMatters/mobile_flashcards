import { DELETE_DECK, ADD_DECK, RECEIVE_DECKS, ADD_QUESTION } from '../actions';

const decks = (state = {}, action) => {
  switch (action.type) {
    case ADD_DECK:
      return { ...state, ...action.deck };
    case DELETE_DECK:
      let decks = { ...state };
      decks[action.id] = {};
      delete decks[action.id];
      return decks;
    case RECEIVE_DECKS:
      return { ...state, ...action.decks };
    case ADD_QUESTION:
      return {
        ...state,
        [action.deckId]: {
          ...state[action.deckId],
          questions: [
            ...state[action.deckId].questions,
            {
              id: action.qid,
              title: action.title,
              answer: action.answer,
            },
          ],
        },
      };
    default:
      return state;
  }
};

export default decks;
