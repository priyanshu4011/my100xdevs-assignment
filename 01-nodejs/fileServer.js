const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// 1. GET /files - Yeh route 'files' folder ki saari files ki list return karega
app.get('/files', (req, res) => {
    const folderPath = path.join(__dirname, './files');
    
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve files' });
        }
        res.status(200).json(files);
    });
});

// 2. GET /file/:filename - Yeh route kisi specific file (jaise a.txt) ka content read karega
app.get('/file/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, './files', filename);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(404).send('File not found');
        }
        res.status(200).send(data);
    });
});

// 3. For all other routes - Agar koi galat URL hit kare toh 404 error aaye
app.all('*', (req, res) => {
    res.status(404).send('Route not found');
});

// Server ko listen karwane ke liye export ya listen script
module.exports = app;