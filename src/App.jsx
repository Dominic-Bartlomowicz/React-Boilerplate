
import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: ""}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
    this.sendMessage=this.sendMessage.bind(this);
    this.sendUsername=this.sendUsername.bind(this);
  }


  componentDidMount() {

      this.socket = new WebSocket('ws://localhost:3001');
      this.socket.addEventListener('message', event => {
        console.log('message', event);
        const newMessage = JSON.parse(event.data);
        if(newMessage.messageType === 'chat message') {
          this.setState({
            messages: this.state.messages.concat(newMessage),
          });
        }
      });
    }


  sendUsername(username) {
    this.state.currentUser.name = username;
    console.log(username);
    //this.socket.send(username);
    console.log(username);
  }


  sendMessage(content){

    const newMessage = {
      username: this.state.currentUser.name,
      content: content
    }
    this.socket.send(JSON.stringify(newMessage));
    console.log(newMessage)
  }


  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <ChatBar
          user={this.state.currentUser.name}
          sendMessage={this.sendMessage}
          sendUsername={this.sendUsername}
        />
        <MessageList messages={this.state.messages}/>

      </div>
    );
  }
}

export default App;
