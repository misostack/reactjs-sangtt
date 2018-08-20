import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component {
  render() {
    return (
      
     <div className="row menu"> 
      
      <div id="logo">FOTP Pools</div>
        <nav>
          <a href="#" id="menu-icon"><i className="fa fa-bars"></i></a>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/user">User</Link></li>

          </ul>

        </nav>
    </div>
    );
  }
}

export default Menu;
