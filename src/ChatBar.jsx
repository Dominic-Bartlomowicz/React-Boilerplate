import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);
    this._handleKeyPress = this._handleKeyPress.bind(this)
  }

  _handleKeyPress = (event) => {
    if (event.key === 'Enter') {

      console.log("value in text box: "+event.target.value);
      this.props.onTest(event.target.value);
    }
  }

  render() {
    console.log("Rendering <ChatBar/>");
    return(
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.user.name} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this._handleKeyPress}/>
      </footer>
    );
  }
}

export default ChatBar;
