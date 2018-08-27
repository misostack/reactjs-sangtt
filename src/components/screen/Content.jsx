import React, { Component } from 'react';
import Menu from './Menu';
import 'styles/Content.scss';

import { Switch, Route } from 'react-router-dom';
import { Home, User } from 'containers';
class Content extends Component {
	render() {
		return (
			<div>
				<Menu />
				<div className="container main">
					<Switch>
						<Route exact path='/' component={Home} />
						<Route path='/user' component={User} />
					</Switch>
				</div>
			</div>
		);
	}
}

export default Content;
