const express = require('express');
const { readFromFile } = require('../helpers/fsUtils');
const router = express.Router();
// Import our modular routers for /tips and /feedback
const notesRouter = require('./notes');

const app = express();

router.get('/notes', (req, res) => {
    readFromFile('./db/db.json')
    .then((data) => res.json(JSON.parse(data)))
    .catch((error) => res.status(500).json({ error: 'Internal server error'}));
});

app.use('/notes', notesRouter);

module.exports = app;
module.exports = router;