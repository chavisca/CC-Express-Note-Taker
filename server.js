const express = require('express');
const path = require('path');
const { clog } = require('./helpers/clog');
const api = require(/routes/index.js);

const PORT = process.env.PORT || 3001;

const app = express();

// Helper function for generating unique ids
const uuid = require('./helpers/uuid')

// Helper functions for reading and writing to the JSON file
const { readFromFile, readAndAppend } = require('./helpers/fsUtils');

// Middleware loads
app.use(clog);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', api);

// GET route for the index page
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/index.html'))
);

// GET route for the notes HTML page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/notes.html'))
);

// API GET route for the notes DB JSON
app.get('/api/notes', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received to add a note`);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully`);
  } else {
    res.error('Error in adding note');
  }
});

// Wildcard route to index
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/index.html'))
);

  app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);