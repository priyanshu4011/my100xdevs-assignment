require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Database Connect
connectDB();

// Global Middlewares
app.use(cors());
app.use(express.json());

// Routes Mount Points
app.use('/api/auth', require('./routes/auth'));
app.use('/api/households', require('./routes/household'));
app.use('/api/items', require('./routes/item'));
app.use('/api/dashboard', require('./routes/dashboard'));

// System Check
app.get('/system-check', (req, res) => res.json({ runtime: "Operational Grid Active" }));

const RUNTIME_PORT = process.env.PORT || 8080;
app.listen(RUNTIME_PORT, () => console.log(`Server listening on node port: ${RUNTIME_PORT}`));