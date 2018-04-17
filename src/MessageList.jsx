import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList/>");

    const messages = this.props.messages;
    console.log(messages);
    const listItems = messages.map((message) =>
    <Message key = {message.id} message={message}/>
    );

    return(
      <main className="messages">
  {listItems}
  </main>
  );
  }
}

export default MessageList;
