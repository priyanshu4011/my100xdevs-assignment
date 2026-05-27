const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Todos ko memory mein store karne ke liye ek khali array
let todos = [];

// 1. GET /todos - Saare todos ki list dekhne ke liye
app.get('/todos', (req, res) => {
  res.status(200).json(todos);
});

// 2. GET /todos/:id - Kisi ek specific todo ko uski ID se dhoondhne ke liye
app.get('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) {
    return res.status(404).send('Todo not found');
  }
  res.status(200).json(todo);
});

// 3. POST /todos - Naya todo create karne ke liye (Unique ID ke saath)
app.post('/todos', (req, res) => {
  const newTodo = {
    id: Math.floor(Math.random() * 1000000), // Random unique ID generate karne ke liye
    title: req.body.title,
    description: req.body.description
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// 4. PUT /todos/:id - Kisi purane todo ko update karne ke liye
app.put('/todos/:id', (req, res) => {
  const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (todoIndex === -1) {
    return res.status(404).send('Todo not found');
  }
  todos[todoIndex].title = req.body.title;
  todos[todoIndex].description = req.body.description;
  res.status(200).json(todos[todoIndex]);
});

// 5. DELETE /todos/:id - Kisi todo ko delete karne ke liye
app.delete('/todos/:id', (req, res) => {
  const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (todoIndex === -1) {
    return res.status(404).send('Todo not found');
  }
  todos.splice(todoIndex, 1);
  res.status(200).send('Deleted successfully');
});

// Baaki bache saare galat routes ke liye 404 error handle karne ke liye
app.use((req, res, next) => {
  res.status(404).send();
});

module.exports = app;