import React, {Component} from 'react';


class ChatBar extends Component {
  render() {
    return (
        <footer className='chatbar'>
            <input className="chatbar-username" onKeyPress={this.props.newUser} placeholder='Enter a username (Optional)'/>
            <input className="chatbar-message" onKeyPress={this.props.onKeyPress} placeholder="Type a message and hit ENTER" />
        </footer>
    );
  }
}
export default ChatBar;
