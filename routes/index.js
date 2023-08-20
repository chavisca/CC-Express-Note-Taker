const express = require('express');

// Import our modular routers for /tips and /feedback
const notesRouter = require('./notes');
const indexRouter = require('./index');

const app = express();

app.use('/notes', notesRouter);
app.use('/index', indexRouter);

module.exports = app;