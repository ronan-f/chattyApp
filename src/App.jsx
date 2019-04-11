import React, { Component } from "react";
import NavBar from "./NavBar.jsx";
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "postMessage",
      messages: [],
      user: "Anonymous",
      numberOfUsers: 0,
      currentUserId: null,
      currentUser: {id: null, color: null}
    };
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://0.0.0.0:3001");
    this.socket.onopen = () => {
      console.log("Connected to sockets");
    };
    this.socket.onmessage = event => {
      const parsedMessageObj = JSON.parse(event.data);
      if (parsedMessageObj.type === 'connection') {
        this.setState({currentUser: {id: null, color: parsedMessageObj.color }});
      } else {
        this.setState({
          messages: this.state.messages.concat(parsedMessageObj),
          numberOfUsers: parsedMessageObj.numberOfUsers
        });
      }
    };
  }

  addMessage = e => {
    let value = e.target.value;
    const imgTest = /\.(jpg|png|gif)\b/;
    let newMessage = {
      username: this.state.user,
      content: value,
      type: "incomingMessage",
      color: this.state.currentUser.color
    };

    if(imgTest.test(value) && e.key === 'Enter') {
      const inputAsArray = value.split(' ');
      let url = '';
      const restOfMessageArray = [];
      for(let word of inputAsArray) {
        if (imgTest.test(word)){
          url = word;
        } else {
          restOfMessageArray.push(word);
        }
      }
      const restOfMessageJoined = restOfMessageArray.join(' ');
      newMessage.content = restOfMessageJoined;
      newMessage.url = url;
      newMessage.type = 'image';
      this.socket.send(JSON.stringify(newMessage));
      e.target.value = "";
    }else if (e.key === "Enter" && value.trim()) {

      this.socket.send(JSON.stringify(newMessage));
      e.target.value = "";
    }
  };

  newUsername = e => {
    let value = e.target.value;
    if (
      e.key === "Enter" && value !== this.state.user && value.trim()
    ) {
      this.setState({ user: value });
      const adminMessage = {
        username: "",
        content: `${this.state.user} changed their name to ${value}`,
        type: "incoming-notification"
      };
      this.socket.send(JSON.stringify(adminMessage));
    }
  };

  render() {
    return (
      <div>
        <NavBar numOfUsers={this.state.numberOfUsers} />
        <MessageList
          allMessages={this.state.messages}
          users={this.state.users}
          currentId={this.state.currentUserId}
        />
        <ChatBar
          onKeyPress={e => this.addMessage(e)}
          newUser={e => this.newUsername(e)}
          username={this.state.user}
        />
      </div>
    );
  }
}
export default App;
