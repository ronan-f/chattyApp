import React, { Component } from "react";

class Message extends Component {
  render() {
    let tagsToRender;

    if(this.props.type === 'image'){ //handle image urls
      tagsToRender =
      <div>
        <div className='message-content'>{this.props.content} </div>
        <img className='incoming-image' src={this.props.imageUrl} />
      </div>
    } else if(this.props.type === 'incomingMessage'){ //handle regular messages
      tagsToRender = <span className='message-content'>{this.props.content}</span>
    } else { //notifcation handling
      tagsToRender = <span className='notification-content'>{this.props.content}</span>
    }

      return (
        <div className="message">
          <span style={{ color: this.props.color }} className="message-username">
            {this.props.username}
          </span>
          {tagsToRender}
        </div>
      );



  }
}
export default Message;
