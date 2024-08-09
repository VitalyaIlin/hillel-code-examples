const http = require('http');
const url = require('url');
const crypto = require('crypto');

let tasks = [];

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
    // Handle preflight requests
    if (method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

  res.setHeader('Content-Type', 'application/json');

  if (path === '/tasks' && method === 'GET') {
    // Get all tasks
    res.writeHead(200);
    res.end(JSON.stringify(tasks));
  } else if (path === '/tasks' && method === 'POST') {
    // Create a new task
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const { text } = JSON.parse(body);
      const newTask = { id: crypto.randomUUID(), text };
      tasks.push(newTask);
      res.writeHead(201);
      res.end(JSON.stringify(newTask));
    });
  } else if (path.startsWith('/tasks/') && method === 'PUT') {
    // Edit an existing task
    const id = path.split('/')[2];
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const { text } = JSON.parse(body);
      const task = tasks.find(task => task.id === id);
      if (task) {
        task.text = text;
        res.writeHead(200);
        res.end(JSON.stringify(task));
      } else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'Task not found' }));
      }
    });
  } else if (path.startsWith('/tasks/') && method === 'DELETE') {
    // Delete a task
    const id = path.split('/')[2];
    tasks = tasks.filter(task => task.id !== id);
    res.writeHead(204);
    res.end();
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ message: 'Not Found' }));
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});