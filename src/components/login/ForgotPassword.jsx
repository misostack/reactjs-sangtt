import React, { Component } from 'react';
import Notification from 'components/notifications'

import 'styles/Login.scss'

class ForgotPassword extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "admin@dirox.net",
			password: "",
			repassword: "",
			status: false,
		}
	}
	componentWillReceiveProps(nextProps){
		let { email, password } = this.state;
		if(nextProps.user.filter(e => e.email === email && e.password === password).length) this.props.history.push('/');
		 
	}
	onRequest = () => {
		let { email } = this.state;
		let { exitEmailAction } = this.props;
		exitEmailAction(email).then(
			() =>  this.setState({ status: true })
		)
		.catch( err => Notification.e( err.message, 'error') )
	}

	onSave = () => {
		let { email, password, repassword } = this.state;
		if(password === repassword){
			this.props.changeInfoUserAction({email,password})
			.then(
				()=>{
					Notification.s('redirec to Login page ', 'Change success', 3000)
					this.props.history.push('/')
				}
			)
			.catch( err => Notification.e( err.message, 'error') )
		}
			
		else Notification.e('Passwords do not overlap', 'error')
	}

	formEmail = () => {
		let { email } = this.state;
		return (
			<div className="input-group">
				<input type="email" placeholder="email" className="form-control" value={email} onChange={e => this.setState({ email: e.target.value })} />
				<div className="input-group-append">
					<button className="btn btn-success pull-left btn-sm" id="btnLogin" onClick={this.onRequest} >Request</button>
				</div>
			</div>
		)
	}
	formPassword = () => {
		let { password, repassword } = this.state;

		return (
			<div className="form-group">
					<h4>enter your new password</h4>
					<input type="password" className="form-control" placeholder="password" value={password} onChange={e => this.setState({ password: e.target.value })} />
				
				
					<input type="password" className="form-control" placeholder="repassword" value={repassword} onChange={e => this.setState({ repassword: e.target.value })} />
				<div className="form-field">
					<button className="btn btn-success" id="btnLogin" onClick={this.onSave}>Save</button>

				</div>
			</div>
		)
	}
	render() {

		let { status } = this.state;
		return (
			<div className="forgotContainer">
				<div className="forgotPassword">
					<h1>FOTP pools</h1>
					{!status ? this.formEmail() : this.formPassword()}


				</div>
			</div>

		);
	}
}

export default ForgotPassword;
