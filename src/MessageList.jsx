import React, {Component} from 'react';
import Message from './Message.jsx';


// Creating class for MessageList

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList/>");

    const messages = this.props.messages

    const listItems = messages.map((message) =>
      <Message
        key = {message.id}
        username={message.username}
        content={message.content}
      />
    );

    return (
      <main className="messages">
        {listItems}
      </main>
    );
  }
}

export default MessageList;
