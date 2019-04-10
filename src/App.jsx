import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {messages: [], user: ''};
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onopen = () => {
      console.log('Connected to sockets');
    }
    this.socket.onmessage = (event) => {
      const parsedMessageObj = JSON.parse(event.data);
      this.setState({messages: this.state.messages.concat(parsedMessageObj)});
    }
  }

  addMessage = (e) => {
    const user = this.state.user ? this.state.user : 'Anonymous';
    if(e.key === 'Enter'){
      const newMessage = {username: user, content: e.target.value}
      this.socket.send(JSON.stringify(newMessage));
      e.target.value = '';
    }
  }

  newUsername = (e) => {
      this.setState({user: e.target.value});
  }

  render() {
    return (
      <div>
        <NavBar />
        <MessageList allMessages={this.state.messages} />
        <ChatBar onKeyPress={(e) => this.addMessage(e)} newUser={(e) => this.newUsername(e)} username={this.state.user} />
      </div>
    );
  }
}
export default App;
