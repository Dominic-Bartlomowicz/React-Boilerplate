import React, {Component} from 'react';

class Notification extends Component {
  render() {

    console.log("Rendering <Notification/>");

    return (
      <div className="notification">
        <span className="notification-content">{this.props.notification.content}</span>
      </div>
  );
  }
}

export default Notification;
