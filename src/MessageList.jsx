import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {

    const messageArray = this.props.allMessages.map(message => {
      return (
        <Message
          key={message.id}
          username={message.username}
          content={message.content}
          type={message.type}
          color={message.color}
          imageUrl={message.url}
        />
      );
    });

    return <React.Fragment>{messageArray}</React.Fragment>;
  }
}
export default MessageList;
