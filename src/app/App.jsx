import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import Routes from './Routes'
import ConfigureStore from 'store/configureStore';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';

class App extends Component {
  render() {
    return (
      <Provider store={ConfigureStore}>
        <Router>
          <Fragment>
            <NotificationContainer/>
            <Routes {...this.props} />
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
