import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { logoutAction } from '../../actions/login';

class Menu extends Component {
  logout = () => {
    this.props.logoutAction();
  }
  render() {
    return (
      
     <div className="menu"> 
      
      <div id="logo">FOTP Pools</div>
        <nav>
          <a href="#" id="menu-icon"><i className="fa fa-bars"></i></a>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/user">User</Link></li>
            <li><Link to="/logout" onClick={this.logout}>Logout</Link></li>

          </ul>

        </nav>
    </div>
    );
  }
}



function mapDispatchToProps(dispatch) {
    return {
        logoutAction: bindActionCreators(logoutAction, dispatch)
    }
}

export default connect(
    null,
    mapDispatchToProps
)(Menu)
