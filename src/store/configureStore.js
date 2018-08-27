import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'reducers';
import createLogger from 'redux-logger'; 

import appStateMiddleware from './middleware/appState';
import initialState from './initialState';

let middleware;
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

if (process.env.NODE_ENV !== 'production') {
  middleware = composeEnhancers(applyMiddleware(thunk, createLogger, appStateMiddleware));
} else {
  middleware = applyMiddleware(thunk, appStateMiddleware);
}

let configureStore =  createStore(rootReducer, initialState(), middleware);

export default configureStore;
