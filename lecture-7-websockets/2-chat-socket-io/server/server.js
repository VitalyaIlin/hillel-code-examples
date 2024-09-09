const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', // Update this to match the client URL
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
        credentials: true
    }
});

const users = {}; // Store connected users

io.on('connection', (socket) => {
    console.log('A user connected');
  
    // Handle user registration
    socket.on('register', (username) => {
      users[username] = socket.id;
      socket.username = username; // Store username in socket
      console.log('users', users);
      io.emit('users', Object.keys(users)); // Send the list of users to all clients
    });
  
    // Handle direct message
    socket.on('direct_message', ({ to, message }) => {
      console.log('to', { to, message })
      console.log('users', users);
      const toSocketId = users[to];
      if (toSocketId) {
        io.to(toSocketId).emit('direct_message', {
          from: socket.username,
          message,
        });
      }
    });
  
    // Handle user disconnect
    socket.on('disconnect', () => {
      for (let [username, id] of Object.entries(users)) {
        if (id === socket.id) {
          delete users[username];
          break;
        }
      }
      io.emit('users', Object.keys(users)); // Update the list of users after a disconnect
      console.log('A user disconnected');
    });
  });

server.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
