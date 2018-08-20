import React, { Component } from 'react';
import { Input, Button } from 'reactstrap';
import '../../styles/login.css';

class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: "admin@dirox.net",
      password:"admin"
    }
  }

  onLogin = () => {
    this.props.loginAction(this.state);
  }

  forgotPass= () => {
    this.props.history.push('/forgotpassword');
  }
  componentDidMount(){
   if(this.props.login.status) this.props.history.push('/');
  }

  componentWillReceiveProps(nextProps){
   if(nextProps.login.status) this.props.history.push('/');
    
  }
  render() {
    
    let { email, password} = this.state;
    let { login } = this.props;
    return(
      <div className="container">
        {login.loading ?<i className="fa fa-circle-o-notch fa-spin loader"></i>:

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
