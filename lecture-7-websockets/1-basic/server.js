const WebSocket = require('ws');

// Create a new WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// Listen for connection events
wss.on('connection', (ws) => {
  console.log('New client connected');

  // Send a welcome message to the client
  ws.send('Welcome to the WebSocket server!');

  setInterval(() => {
    ws.send('Hello from setInterval');
  }, 2000);

  // Listen for messages from the client
  ws.on('message', (message) => {
    console.log(`Received from client: ${message}`);

    // Echo the received message back to the client
    ws.send(`Server echo: ${message}`);
  });

  // Handle client disconnection
  ws.on('close', () => {
    console.log('Client has disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:8080');
