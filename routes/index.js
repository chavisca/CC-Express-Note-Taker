const express = require('express');
const { readFromFile } = require('../helpers/fsUtils');
// Import our modular routers for /tips and /feedback
const notesRouter = require('./notes');

const app = express();

app.get('/notes', (req, res) => {
    readFromFile('../db/db.json')
    .then((data) => res.json(JSON.parse(data)))
    .catch((error) => res.status(500).json({ error: 'Internal server error'}));
});

app.use('/notes', notesRouter);

module.exports = app;