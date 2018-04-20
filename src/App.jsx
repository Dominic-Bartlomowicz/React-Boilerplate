// Importing dependencies

import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


// Main class with constructor, super() syntax, and binding

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: ""}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      users: 0
    };

    this.sendMessage=this.sendMessage.bind(this);
    this.sendUsername=this.sendUsername.bind(this);
    this.sendNotification=this.sendNotification.bind(this);
    this.updateUsername=this.updateUsername.bind(this);
  }


// Receives components from server

  componentDidMount() {
      this.socket = new WebSocket('ws://localhost:3001');
      this.socket.addEventListener('message', event => {
        console.log('message', event);

        const newMessage = JSON.parse(event.data);
        if(newMessage.type === "postMessage") {
          this.setState({
            messages: this.state.messages.concat(newMessage),
          });
        }

        const newNotification = JSON.parse(event.data);
        if(newNotification.type === "postNotification") {
          this.setState({
            messages: this.state.messages.concat(newNotification),
          });
        }

        const numUsers = JSON.parse(event.data);
        if(numUsers.type === "updateUsers") {
          this.setState({
            users: numUsers.content
          });
        }
      });
    }


// Receives username from Chatbar.jsx

  sendUsername(username) {
    this.state.currentUser.name = username;
  }


// Receives message from Chatbar.jsx and sends to server.js

  sendMessage(content){

    const newMessage = {
      username: this.state.currentUser.name,
      content: content,
      type: "incomingMessage"
    }
    this.socket.send(JSON.stringify(newMessage));
  }


// Receives new usernames from Chatbar.jsx and sends to server.js

  updateUsername(content) {

    this.setState({
      currentUser: {name: content},
    });

    this.socket.send(JSON.stringify(content));
  }


// Receives notification that the current user changes their name from Chatbar.jsx and sends to server.js

  sendNotification(content){

    const newNotification = {
      content: content,
      type: "incomingNotification"
    }
    this.socket.send(JSON.stringify(newNotification));
  }


// Main render function

  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <p>{this.state.users} users online</p>
        </nav>
        <ChatBar
          user={this.state.currentUser.name}
          sendMessage={this.sendMessage}
          sendUsername={this.sendUsername}
          sendNotification={this.sendNotification}
          updateUsername={this.updateUsername}
        />
        <MessageList messages={this.state.messages}/>

      </div>
    );
  }
}

export default App;
