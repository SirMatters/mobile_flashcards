import { DELETE_DECK, ADD_DECK, RECEIVE_DECKS } from '../actions';

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
    default:
      return state;
  }
};

export default decks;
