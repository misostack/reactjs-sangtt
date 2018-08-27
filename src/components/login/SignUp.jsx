import React, { Component } from 'react';
import { Input, Button } from 'reactstrap';
import Notification from 'components/notifications'

import 'styles/Login.scss';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "admin",
      email: "admin@dirox.net",
      password: "admin",
      repassword: "admin"
    }
  }

  onSignUp = () => {
    let { repassword, ...rest} = this.state ;
    this.props.signUpAction({...rest})
    .then(
      ()=>{
        Notification.s('redirec to Login page ', 'Signup success', 3000)
        this.props.history.push('/')
      }
    )
    .catch( err => Notification.e( err.message, 'error') )
  }

  render() {
    let { email, password, username, repassword } = this.state;
    let { auth } = this.props;
    return (
      <div className="loginContainer">
        {auth.loading ? <i className="fa fa-circle-o-notch fa-spin loader"></i> :

          <div className="loginForm">
            <h1>FOTP pools</h1>
            <div className="form-field">
              <Input type="text" placeholder="username" value={username} onChange={e => this.setState({ username: e.target.value })} />
            </div>
            <div className="form-field">
              <Input type="email" placeholder="email" value={email} onChange={e => this.setState({ email: e.target.value })} />
            </div>
            <div className="form-field">
              <Input placeholder="password" type="password" value={password} onChange={e => this.setState({ password: e.target.value })} />
            </div>
            <div className="form-field">
              <Input placeholder="password" type="repassword" value={repassword} onChange={e => this.setState({ repassword: e.target.value })} />
            </div>
            <div className="form-field">
              <Button className="ml-3 btn-success" id="btnLogin" onClick={this.onSignUp}>Sign up</Button>
            </div>
          </div>}
      </div>
    );
  }
}

export default SignUp;
