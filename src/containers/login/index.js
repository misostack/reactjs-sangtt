import { connect } from 'react-redux'
import { loginAction } from 'actions/login'
import { bindActionCreators } from 'redux'

import { changeInfoUserAction, exitEmailAction, signUpAction } from 'actions/user';

import React, { Component } from 'react'

const Login = ({ children: Component, ...rest }) => <Component {...rest}/>  

function mapStateToProps ({ auth }) {
  return {
    auth
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loginAction: bindActionCreators(loginAction, dispatch),
    changeInfoUserAction: bindActionCreators(changeInfoUserAction, dispatch),
    exitEmailAction: bindActionCreators(exitEmailAction, dispatch),
    signUpAction: bindActionCreators(signUpAction, dispatch),
  }
}
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)