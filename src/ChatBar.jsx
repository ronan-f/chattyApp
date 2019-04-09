import React, {Component} from 'react';


class ChatBar extends Component {
  render() {
    return (
        <footer className='chatbar'>
            <input className="chatbar-username" defaultValue={this.props.username} placeholder='Enter a username'/>
            <input className="chatbar-message" onKeyDown={this.props.onKeyPress} placeholder="Type a message and hit ENTER" />
        </footer>
    );
  }
}
export default ChatBar;
