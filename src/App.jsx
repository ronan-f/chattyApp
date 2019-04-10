import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {type: 'postMessage', messages: [], user: 'Anonymous', numberOfUsers: 0};
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://192.168.88.231:3001");
    this.socket.onopen = () => {
      console.log('Connected to sockets');
    }
    this.socket.onmessage = (event) => {
      const parsedMessageObj = JSON.parse(event.data);
      this.setState({messages: this.state.messages.concat(parsedMessageObj), numberOfUsers: parsedMessageObj.numberOfUsers});
    }
  }

  addMessage = (e) => {
    const user = this.state.user;
    if(e.key === 'Enter'){
      const newMessage = {username: user, content: e.target.value, type: 'incomingMessage'}
      this.socket.send(JSON.stringify(newMessage));
      e.target.value = '';
    }
  }

  newUsername = (e) => {
    if(e.key === 'Enter') {
      this.setState({user: e.target.value});
      const adminMessage = {username: 'ADMIN', content: `${this.state.user} changed their name to ${e.target.value}`, type: 'incoming-notification'}
      this.socket.send(JSON.stringify(adminMessage));
    }
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <NavBar numOfUsers={this.state.numberOfUsers} />
        <MessageList allMessages={this.state.messages} />
        <ChatBar onKeyPress={(e) => this.addMessage(e)} newUser={(e) => this.newUsername(e)} username={this.state.user} />
      </div>
    );
  }
}
export default App;
