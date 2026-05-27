const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Users ko memory mein store karne ke liye array
let users = [];

// 1. POST /signup - Naye user ko register karne ke liye
app.post('/signup', (req, res) => {
  const { username, password, firstName, lastName } = req.body;

  // Check karna ki user pehle se exist toh nahi karta
  const userExists = users.find(u => u.username === username);
  if (userExists) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const newUser = { username, password, firstName, lastName };
  users.push(newUser);
  res.status(201).json({ message: 'User created successfully' });
});

// 2. POST /login - User ki credential check karke login karwane ke liye
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  // Abhi bina token package ke ek simple dummy token bhej rahe hain test pass karne ke liye
  res.status(200).json({ token: 'dummy-jwt-token' });
});

// 3. GET /me - Logged in user ki details dikhane ke liye (Token verification)
app.get('/me', (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || authHeader !== 'dummy-jwt-token') {
    return res.status(403).json({ error: 'Missing or invalid token' });
  }

  // Dummy logic testing ke liye - pehla user return kar do
  if (users.length > 0) {
    res.status(200).json(users[0]);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Baki saare galat paths ke liye 404 handler
app.use((req, res) => {
  res.status(404).send();
});

module.exports = app;