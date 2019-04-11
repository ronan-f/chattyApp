import React, { Component } from "react";

class Message extends Component {
  render() {
    let tagName;

    if(this.props.type === 'image'){
      tagName =
      <div>
        <div className='message-content'>{this.props.content} </div>
        <img className='incoming-image' src={this.props.imageUrl} />
      </div>
    } else if(this.props.type === 'incomingMessage'){
      tagName = <span className='message-content'>{this.props.content}</span>
    } else {
      tagName = <span className='notification-content'>{this.props.content}</span>
    }

      return (
        <div className="message">
          <span style={{ color: this.props.color }} className="message-username">
            {this.props.username}
          </span>
          {tagName}
        </div>
      );



  }
}
export default Message;
