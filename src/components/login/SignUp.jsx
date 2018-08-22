import React, { Component } from 'react';
import { Input, Button } from 'reactstrap';
import '../../styles/login.css';

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
    let result = this.props.signUpAction(this.state);
    if(result) this.props.history.push('/login');
  }

  render() {
    let { email, password, username, repassword } = this.state;
    let { login } = this.props;
    return (
      <div className="loginContainer">
        {login.loading ? <i className="fa fa-circle-o-notch fa-spin loader"></i> :

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
              <Button className="ml-3 btn btn-sucess" id="btnLogin" onClick={this.onSignUp}>Sign up</Button>
            </div>
          </div>}
      </div>
    );
  }
}

export default SignUp;
