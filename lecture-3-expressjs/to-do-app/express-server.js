import express from 'express';
// import crypto from 'crypto';
import bodyParser from 'body-parser';
import cors from 'cors';


const app = express();
app.use(bodyParser.json());
app.use(cors());

let tasks = [];

app.get('/tasks', (req, res) => {
  res.send(tasks);
});

app.post('/tasks', async (req, res) => {
  const { text } = req.body;
  const crypto = import('crypto');
  const newTask = {
      id: crypto.randomUUID(),
      text
  };
  tasks.push(newTask);

  res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
  const { id } = req.params; 
  const { text } = req.body;

  const task = tasks.find(task => task.id === id);
  if (task) {
    task.text = text;

    res.status(200).json(task);
  } else {
    res.status(404).json({
      message: 'Task not found',
    });
  }
});

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params; 
  tasks = tasks.filter(task => task.id !== id);
  res.status(204).json({});
});

app.listen(3000, () => {
    console.log('Express js server is working!');
});