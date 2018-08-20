import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

let initialState = { 
    user: [{ email:"admin@dirox.net", password:"admin" }],
    login: !!localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')) : {status: false}
  };

const middleWare =  composeWithDevTools(applyMiddleware(thunk));

const store = createStore(rootReducer, initialState, middleWare);
export default store;