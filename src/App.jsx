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
        this.setState({currentUser: {id: parsedMessageObj.id, color: parsedMessageObj.color }});
      } else {
        this.setState({
          messages: this.state.messages.concat(parsedMessageObj),
          numberOfUsers: parsedMessageObj.numberOfUsers
        });
      }
    };
  }

  addMessage = e => {
    if (e.key === "Enter" && e.target.value.trim()) {
      const newMessage = {
        username: this.state.user,
        content: e.target.value,
        type: "incomingMessage",
        color: this.state.currentUser.color
      };
      this.socket.send(JSON.stringify(newMessage));
      e.target.value = "";
    }
  };

  newUsername = e => {
    if (
      e.key === "Enter" && e.target.value !== this.state.user && e.target.value.trim()
    ) {
      this.setState({ user: e.target.value });
      const adminMessage = {
        username: "",
        content: `${this.state.user} changed their name to ${e.target.value}`,
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
