const notes = require('express').Router();
const { v4: uuidv4 } = require('../helpers/uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)));
});

// GET Route for a specific tip
notes.get('/:noteUID', (req, res) => {
  const noteUID = req.params.noteUID;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.noteUID === noteUID);
      return result.length > 0
        ? res.json(result)
        : res.json('No note with that UID');
    });
});

// DELETE Route for a specific tip
tips.delete('/:noteUID', (req, res) => {
  const noteUID = req.params.noteUID;
  readFromFile('../db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all tips except the one with the ID provided in the URL
      const result = json.filter((note) => note.noteUID !== noteUID);

      // Save that array to the filesystem
      writeToFile('./db/db.json', result);

      // Respond to the DELETE request
      res.json(`Item ${noteUID} has been deleted 🗑️`);
    });
});

// POST Route for a new UX/UI tip
notes.post('/', (req, res) => {
  console.log(req.body);

  const { title, text, noteUID } = req.body;

  if (req.body) {
    const newTip = {
      title,
      text,
      noteUID: uuidv4(),
    };

    readAndAppend(newTip, '../db/db.json');
    res.json(`Note added successfully`);
  } else {
    res.error('Error in adding note');
  }
});

module.exports = notes;