// server.js

const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuidv1 = require('uuid/v1');


// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Broadcast to all.
wss.broadcast = function broadcast(message) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));

  ws.on('message', function incoming(message) {

     console.log('received message: %s', message);
     console.log(message);
     var messageObj = JSON.parse(message);

     console.log(messageObj.type);

     if (messageObj.type === "incomingMessage"){

      var obj = {
        id: uuidv1(),
        username: messageObj.username,
        content: messageObj.content,
        type: "postMessage"
      }
      var string = JSON.stringify(obj);
      wss.broadcast(string);
    }
   });

   ws.on('message', function incoming(notification) {

      console.log('received notification: %s', notification);
      console.log(notification);
      var notifObj = JSON.parse(notification);

      if (notifObj.type === "incomingNotification"){

      var obj = {
        id: uuidv1(),
        content: notifObj.content,
        type: "postNotification"
        }

        var string = JSON.stringify(obj);
        wss.broadcast(string);
      }
    });
  });
