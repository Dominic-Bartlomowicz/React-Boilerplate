import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {value: props.user};
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this._handleChange = this._handleChange.bind(this);
  }

  _handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.props.sendMessage(event.target.value,this.state.value);
    }
  }

  _handleChange = (event) => {
    this.props.sendUsername(event.target.value);
    this.setState({value: event.target.value});
  }

  render() {
    console.log("Rendering <ChatBar/>");
    return(
      <footer className="chatbar">
        <input className="chatbar-username" type="text" placeholder="Your Name (Optional)" value={this.state.value} onChange={this._handleChange} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this._handleKeyPress}/>
      </footer>
    );
  }
}

export default ChatBar;
