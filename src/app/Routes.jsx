import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute  from './PrivateRoute';
import PublicRoute  from './PublicRoute';

import LoginContainer from 'containers/login'
import Content from 'components/screen/Content'
import { Login, SignUp, ForgotPassword  } from 'components/login'

class Routes extends Component {

  render(){
    return(
      <Switch>        
        <PublicRoute path="/login" component={ LoginContainer } children={Login} />
        <PublicRoute path='/signup' component={ LoginContainer } children={ SignUp } />                         
        <PublicRoute path='/forgotpassword' component={ LoginContainer } children={ ForgotPassword } />    
        <PrivateRoute path="/" component={ Content }/>
      </Switch> 
    )
  }
}

export default Routes