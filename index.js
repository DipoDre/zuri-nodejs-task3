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
app.get('/:id', intern.getIntern);


// POST (Create) an intern.
app.post('/', intern.addIntern);


// UPDATE(Modify) an intern.
app.put('/:id', intern.updateIntern);


// DELETE(Remove) an intern.
app.delete('/:id', intern.deleteIntern);


const port = process.env.PORT || conn.port;

app.listen(port, () => console.log(`app running on port ${port}`));

