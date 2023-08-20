const express = require('express');

// Import our modular routers for /tips and /feedback
const notesRouter = require('./pages/notes');
const indexRouter = require('./pages/index');

const app = express();

app.use('/notes', notesRouter);
app.use('/index', indexRouter);

module.exports = app;