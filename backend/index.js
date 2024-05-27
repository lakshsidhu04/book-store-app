const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bookRouter = require('./routes/booksRoute.js');

const DB_Url = 'mongodb://localhost:27017/booksdb'
mongoose.connect(DB_Url)
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((err) => {
        console.error('Error connecting to the database', err);
    });

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/books', bookRouter);

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
