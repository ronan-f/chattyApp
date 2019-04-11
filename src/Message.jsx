import React, { Component } from "react";

class Message extends Component {
  render() {
    const messageClass = this.props.type === "incomingMessage" ? "message-content" : "notification-content";
    return (
      <div className="message">
        <span style={{ color: this.props.color }} className="message-username">
          {this.props.username}
        </span>
        <span className={messageClass}>{this.props.content}</span>
      </div>
    );
  }
}
export default Message;
