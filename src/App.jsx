import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {messages: [
      {
        id: 1,
        type: "incomingMessage",
        content: "I won't be impressed with technology until I can download food.",
        username: "Anonymous1"
      },
      {
        id: 2,
        type: "incomingNotification",
        content: "Anonymous1 changed their name to nomnom",
        username: 'Admin'
      },
      {
        id: 3,
        type: "incomingMessage",
        content: "I wouldn't want to download Kraft Dinner. I'd be scared of cheese packet loss.",
        username: "Anonymous2"
      },
      {
        id: 4,
        type: "incomingMessage",
        content: "...",
        username: "nomnom"
      },
      {
        id: 5,
        type: "incomingMessage",
        content: "I'd love to download a fried egg, but I'm afraid encryption would scramble it",
        username: "Anonymous2"
      },
      {
        id: 6,
        type: "incomingMessage",
        content: "This isn't funny. You're not funny",
        username: "nomnom"
      },
      {
        id: 7,
        type: "incomingNotification",
        content: "Anonymous2 changed their name to NotFunny",
        username: 'Admin'
      }
    ], user: ''};
  }

  handleKeyDown = (e) => {
    if(e.key === 'Enter'){
      const random = Math.floor(Math.random() * 100000)
      const newMessage = {id: random, username: this.state.user, content: e.target.value}
      this.setState({messages: this.state.messages.concat(newMessage)});
      e.target.value = '';
    }
  }

  newUsername = (e) => {
      this.setState({user: e.target.value});
      console.log(e.target.value);
  }

  render() {
    return (
      <div>
        <NavBar />
        <MessageList allMessages={this.state.messages} />
        <ChatBar onKeyPress={(e) => this.handleKeyDown(e)} newUser={(e) => this.newUsername(e)} username={this.state.user} />
      </div>
    );
  }
}
export default App;
