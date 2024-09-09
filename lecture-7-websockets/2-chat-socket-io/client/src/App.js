import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css'; // Import the CSS file

const socket = io('http://localhost:3001');

function App() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on('users', (users) => {
      setUsers(users);
    });

    // Listen for direct messages
    const handleDirectMessage = ({ from, message }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { from, message },
      ]);
    };

    socket.on('direct_message', handleDirectMessage);

    // Cleanup function to remove the listener
    return () => {
      socket.off('direct_message', handleDirectMessage);
    };
  }, []);

  const handleRegister = () => {
    socket.emit('register', username);
  };

  const handleSendMessage = () => {
    socket.emit('direct_message', { to: recipient, message });
    setMessages((prevMessages) => [
      ...prevMessages,
      { from: 'You', message },
    ]);
  };

  return (
    <div className="container">
      <h1>Direct Message Chat</h1>
      <div>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
      </div>
      <div>
        <h2>Users</h2>
        <ul className="user-list">
          {users.map((user, index) => (
            <li key={index} onClick={() => setRecipient(user)}>
              {user}
            </li>
          ))}
        </ul>
      </div>
      {recipient && (
        <div>
          <h3>Chat with {recipient}</h3>
          <input
            type="text"
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send Message</button>
        </div>
      )}
      <div className="message-list">
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>
              <strong>{msg.from}:</strong> {msg.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
