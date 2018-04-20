import React, {Component} from 'react';


// Creating class for notifications of username changes

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
