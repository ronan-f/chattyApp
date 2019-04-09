import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {


  render() {

    const messageArray = this.props.allMessages.map(message => {
        return <Message
        key={message.id}
        username={message.username}
        content={message.content}
        />
      })

    return (
        <React.Fragment>
            {messageArray}
            <div className="message system"> Anonymous1 changed their name to nomnom.</div>
        </React.Fragment>
    );
  }
}
export default MessageList;


