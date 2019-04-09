import React, {Component} from 'react';


class ChatBar extends Component {
  render() {
    return (
        <footer className='chatbar'>
            <input className="chatbar-username" defaultValue={this.props.username} onChange={this.props.newUser} placeholder='Enter a username'/>
            <input className="chatbar-message" onKeyPress={this.props.onKeyPress} placeholder="Type a message and hit ENTER" />
        </footer>
    );
  }
}
export default ChatBar;
