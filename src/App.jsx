import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
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
      }
    ] , user: ''};
  }

  handleKeyDown(e){
    if(e.key === 'Enter'){
      const newMessage = {id: 10, username: 'Ronan', content: e.target.value}
      const messages = this.state.messages.concat(newMessage)
      this.setState({messages: messages});
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  render() {
    return (
      <div>
        <NavBar />
        <MessageList allMessages={this.state.messages} />
        <ChatBar onKeyPress={(e) => this.handleKeyDown(e)} username={this.state.user} />
      </div>
    );
  }
}
export default App;
