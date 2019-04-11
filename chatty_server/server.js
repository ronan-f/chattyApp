const express = require("express");
const WebSocket = require("ws");
const uuidv1 = require("uuid/v1");

const PORT = 3001;

const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static("public"))
  .listen(PORT, "0.0.0.0", "localhost", () =>
    console.log(`Listening on ${PORT}`)
  );

// Create the WebSockets server
const wss = new WebSocket.Server({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on("connection", ws => {
  console.log("Client connected");
  ws.send(
    JSON.stringify({
      color: "#" + ((Math.random() * 0xffffff) << 0).toString(16),
      type:'connection'
    })
  );
  wss.broadcast(
    JSON.stringify({
      id: uuidv1(),
      content: "A new user has joined",
      type: "incoming-notification",
      numberOfUsers: wss.clients.size
    })
  );
  ws.on("message", function incoming(message) {
    const parsedMessage = JSON.parse(message);
    parsedMessage.id = uuidv1();
    parsedMessage.numberOfUsers = wss.clients.size;
    wss.broadcast(JSON.stringify(parsedMessage));
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on("close", () => {
    console.log("Client disconnected");
    wss.broadcast(
      JSON.stringify({
        id: uuidv1(),
        content: "User disconnected",
        type: "incoming-notification",
        numberOfUsers: wss.clients.size
      })
    );
  });
});
