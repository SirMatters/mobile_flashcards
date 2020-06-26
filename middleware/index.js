import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { logger } from './logger';

// const middleware = applyMiddleware(thunk, logger);
const middleware = applyMiddleware(thunk);

export default middleware;
