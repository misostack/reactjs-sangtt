import React, { Component } from 'react';
import '../../styles/forgotpassword.css';

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
		let { user } = this.props;
		let { email } = this.state;

		let authEmail = user.filter(e => e.email === email).length;
		authEmail > 0 ? this.setState({ status: true }) : alert('Email not exist');
	}

	onSave = () => {
		let { email, password, repassword } = this.state;
		password === repassword ? this.props.changePassword({email,password}) : alert('Passwords do not overlap')
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
					<input className="form-control" placeholder="password" value={password} onChange={e => this.setState({ password: e.target.value })} />
				
				
					<input className="form-control" placeholder="repassword" value={repassword} onChange={e => this.setState({ repassword: e.target.value })} />
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
