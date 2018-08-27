import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { logoutAction } from 'actions/login';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
 } from 'reactstrap';

class Menu extends Component {
  
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  logout = () => {
    this.props.logoutAction();
  }
  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand className="mx-auto"  href="/">FOTP Pools</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-0" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/user">User</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.logout}>Logout</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    //  <div className="menu"> 
      
    //   <div id="logo">FOTP Pools</div>
    //     <nav>
    //       <a href="#" id="menu-icon"><i className="fa fa-bars"></i></a>
    //       <ul>
    //         <li><Link to="/">Home</Link></li>
    //         <li><Link to="/user">User</Link></li>
    //         <li><Link to="/logout" onClick={this.logout}>Logout</Link></li>

    //       </ul>

    //     </nav>
    // </div>



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
