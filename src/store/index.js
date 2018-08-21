import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import initialState from './initialState';

const middleWare =  composeWithDevTools(applyMiddleware(thunk));

const store = createStore(rootReducer, initialState(), middleWare);
export default store;