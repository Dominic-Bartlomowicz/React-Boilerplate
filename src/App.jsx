
import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';

var exampleSocket = new WebSocket("ws://localhost:3001", "protocolOne");

class App extends Component {

  constructor(props) {
    super(props);


    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
            id: 1,
            type: "incomingMessage",
            content: "I won't be impressed with technology until I can download food.",
            username: "Anonymous1"
        },
        {
            id: 2,
            type: "incomingNotification",
            content: "Anonymous1 changed their name to nomnom",
        },
        {
            id: 3,
            type: "incomingMessage",
            content: "I wouldn't want to download Kraft Dinner. I'd be scared of cheese packet loss.",
            username: "Anonymous2"
        },
        {
            id: 4,
            type: "incomingMessage",
            content: "I'd love to download a fried egg, but I'm afraid encryption would scramble it",
            username: "Anonymous2"
        },
        {
            id: 5,
            type: "incomingMessage",
            content: "This isn't funny. You're not funny",
            username: "nomnom"
        }
      ]
    };
    this.onTest=this.onTest.bind(this);
  }


  componentDidMount() {

    exampleSocket.onmessage = function (event) {
      console.log(event);
}
  }


  onTest(content){
    console.log("Hey we are in App.jsx ", content, this)

    const newMessage = {
      id: this.state.messages.length + 1,
      content: content,
      username: this.state.currentUser.name
    }

    const messages = this.state.messages.concat(newMessage)

    this.setState({messages: messages})
  }


  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <ChatBar
          user={this.state.currentUser}
          onTest={this.onTest}
        />
        <MessageList messages={this.state.messages}/>

      </div>
    );
  }
}

export default App;
