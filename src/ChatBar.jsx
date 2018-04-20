import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.previousName = "";
    this._handleMessageKeyPress = this._handleMessageKeyPress.bind(this);
    this._handleUsernameKeyPress = this._handleUsernameKeyPress.bind(this);
  }

  _handleMessageKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.props.sendMessage(event.target.value);
      event.target.value = "";
    }
  }

  _handleUsernameKeyPress = (event) => {

  this.previousName = this.props.user;

    if (event.key === 'Enter') {
      var message = "user "+this.previousName+" has changed their name to "+event.target.value+".";
      this.props.sendNotification(message);
      this.props.updateUsername(event.target.value);
      console.log("its working");
    }

  }

  render() {
    console.log("Rendering <ChatBar/>");
    return(
      <footer className="chatbar">
        <input
          className="chatbar-username"
          type="text"
          placeholder="Your Name (Optional)"
          onKeyPress={this._handleUsernameKeyPress}
        />
        <input
          className="chatbar-message"
          type="text"
          placeholder="Type a message and hit ENTER"
          onKeyPress={this._handleMessageKeyPress}
        />
      </footer>
    );
  }
}

export default ChatBar;
