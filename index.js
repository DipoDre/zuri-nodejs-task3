const express = require('express');
const connectDB = require('./db/mydb.js');
const intern = require('./controller/intern');
const conn = require('./config');

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// GET list of all interns.
app.get('/', intern.getInterns);

// GET an intern.
    // app.get('/{id}', (req, res) => {});
app.get('/:id', intern.getIntern);


// POST (Create) an intern.
    // app.post('/', (req, res) => {});
app.post('/', intern.addIntern);


// UPDATE(Modify) an intern.
    // app.put('/{id}', (req, res) => {});
app.put('/:id', intern.updateIntern);


// DELETE(Remove) an intern.
    // app.delete('/{id}', (req, res) => {});
app.delete('/:id', intern.deleteIntern);


const port = process.env.PORT || conn.port;

app.listen(port, () => console.log(`app running on port ${port}`));

