import React, { Component } from 'react';
import store from '../../store';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Login, AuthLogin, ForgotPassword } from '../../containers';
import Content from '../screen/Content';

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
          <BrowserRouter>
            <Switch>
              <Route path='/login' component={ Login } />              
              <Route path='/forgotpassword' component={ ForgotPassword } />              
              <AuthLogin component={ Content }/>
            </Switch>
          </BrowserRouter>
      </Provider>
    );
  }
}

export default App;