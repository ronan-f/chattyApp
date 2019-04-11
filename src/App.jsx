import React, { Component } from "react";
import NavBar from "./NavBar.jsx";
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      user: "Anonymous",
      numberOfUsers: 0,
      currentUser: {color: null}
    };
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://0.0.0.0:3001"); //establish new websocket connection
    this.socket.onopen = () => {
      console.log("Connected to sockets");
    };
    this.socket.onmessage = event => {
      const parsedMessageObj = JSON.parse(event.data);
      if (parsedMessageObj.type === 'connection') { //If new user joins assign a color in state
        this.setState({currentUser: {color: parsedMessageObj.color }});
      } else { //for all other messages add to messages array in state
        this.setState({
          messages: this.state.messages.concat(parsedMessageObj),
          numberOfUsers: parsedMessageObj.numberOfUsers //update state with current num of users
        });
      }
    };
  }

  addMessage = e => {
    let targetValue = e.target.value;
    const imgTest = /\.(jpg|png|gif)\b/; //regex to check if url is an image
    let newMessage = {
      username: this.state.user,
      content: targetValue,
      type: "incomingMessage",
      color: this.state.currentUser.color
    };

    if(imgTest.test(targetValue) && e.key === 'Enter') { //check if incoming message contains an image
      const inputAsArray = targetValue.split(' '); //split up each word into an array
      let url = ''; //store image url
      const restOfMessageArray = []; //store any part of the message that isnt an image url
      for(let word of inputAsArray) {
        if (imgTest.test(word)){
          url = word;
        } else {
          restOfMessageArray.push(word);
        }
      }
      const restOfMessageJoined = restOfMessageArray.join(' '); //convert rest of words array back to 1 string
      newMessage.content = restOfMessageJoined;
      newMessage.url = url;
      newMessage.type = 'image';
      this.socket.send(JSON.stringify(newMessage));
      e.target.value = "";

    }else if (e.key === "Enter" && targetValue.trim()) {

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
