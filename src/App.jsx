import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
    
    this.sendMessage=this.sendMessage.bind(this);
    this.sendUsername=this.sendUsername.bind(this);
    this.sendNotification=this.sendNotification.bind(this);
    this.updateUsername=this.updateUsername.bind(this);
  }


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
      });
    }


  sendUsername(username) {
    this.state.currentUser.name = username;
  }


  sendMessage(content){

    const newMessage = {
      username: this.state.currentUser.name,
      content: content,
      type: "incomingMessage"
    }
    this.socket.send(JSON.stringify(newMessage));
    console.log(newMessage)
  }


  updateUsername(content) {

    this.setState({
      currentUser: {name: content},
    });

    console.log("The content is"+this.state.currentUser.name);

    this.socket.send(JSON.stringify(content));
  }

  sendNotification(content){

    const newNotification = {
      content: content,
      type: "incomingNotification"
    }
    this.socket.send(JSON.stringify(newNotification));
    console.log(newNotification)
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
          sendNotification={this.sendNotification}
          updateUsername={this.updateUsername}
        />
        <MessageList messages={this.state.messages}/>

      </div>
    );
  }
}

export default App;
