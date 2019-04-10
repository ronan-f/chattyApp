import React, {Component} from 'react';

class NavBar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <span className='online-users'>{this.props.numOfUsers} users online</span>
        </nav>
      </div>

    );
  }
}
export default NavBar;

