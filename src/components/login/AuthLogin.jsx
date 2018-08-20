import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';


class AuthRoute extends React.Component{

	render(){
		let { component: Component, login, ...rest } = this.props;
		console.log(login);
		return (
			<Route
				{...rest}
				render= { 
					() => login.status === true
					? <Component {...this.props} />
					: <Redirect to="/login" />
				}
			/>
			)
	} 
}
export default withRouter(AuthRoute);