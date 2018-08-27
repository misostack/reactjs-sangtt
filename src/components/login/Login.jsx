import React, { Component } from 'react';
import { Input, Button } from 'reactstrap';
import Notification from 'components/notifications'
import 'styles/Login.scss'

class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: "admin@dirox.net",
      password:"admin"
    }
  }

  onLogin = () => {
    this.props.loginAction(this.state)
    .then( res => {
      Notification.s('redirec to home page','success')
      this.props.history.push('/')
    })
    .catch( err =>  {
      console.log(err.message)
      Notification.e(err.message,'error')
    })
  }

  forgotPass= () => {
    this.props.history.push('/forgotpassword');
  }
  signUp= () => {
    this.props.history.push('/signup');
  }

  render() {
    
    let { email, password } = this.state;
    let { auth } = this.props;
    return(
      <div className="loginContainer">
        {auth.loading ?<i className="fa fa-circle-o-notch fa-spin loader"></i>:

        <div className="loginForm">
          <h1>FOTP pools</h1>
         
          <div className="form-field">
            <Input type="email" placeholder="email" value={email} onChange={ e=> this.setState({email: e.target.value})}/>    
          </div>
          <div className="form-field">
            <Input placeholder="password" type="password" value={password} onChange={ e=> this.setState({password: e.target.value})}/>
          </div>
          <div className="form-field">
          <Button className="btn btn-success"  id="btnLogin" onClick={this.onLogin}>Login</Button>
          <Button className="ml-3 btn btn-danger"   id="btnLogin" onClick={this.signUp}>Sign up</Button>

          </div>
          <div className="form-field">
            <button onClick={this.forgotPass} className="btn btn-link">Forgot password</button>


          </div>


        </div>}
      </div>
      
    );
  }
}

export default Login;
