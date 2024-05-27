const express = require('express');
const router = express.Router();
const { Book } = require('../models/bookModel');

router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        return res.status(200).json({ success: true, data: books });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const foundBook = await Book.findById(id);
        if (foundBook) {
            res.status(200).json({ success: true, data: foundBook });
        } else {
            res.status(404).json({ success: false, message: 'Book not found' });
        }
    } catch (err) {
        res.status(400).json({ success: false, message: 'Invalid ID', err: err });
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, description, author,  genre, rating } = req.body;
        console.log(title + ' ' + description + ' ' + author + ' ' + genre+' ' +rating)
        if (!title || !genre || rating === undefined) {
            console.log("enter all values")
            return res.status(400).json({ success: false, message: 'Invalid data' });
        }

        const newBook = { title, description, author,  genre, rating };
        const bookToSave = await Book.create({
            title: newBook.title,
            description: newBook.description,
            author : newBook.author,
            genre : newBook.genre,
            rating : newBook.rating
        });
        res.status(201).json({ success: true, data: bookToSave });
    } catch (err) {
        console.log("gone here")
        res.status(400).json({ success: false, message: 'Invalid data', err: err });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, author , genre, rating } = req.body;
        if (!title || !genre || rating === undefined) {
            return res.status(400).json({ success: false, message: 'Enter all parameters' });
        }
        const updatedBook = await Book.findByIdAndUpdate(id, { title, description, author, genre, rating }, { new: true });
        res.status(200).json({ success: true, data: updatedBook });
    } catch (err) {
        res.status(400).json({ success: false, message: 'Invalid data', err: err });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        if (deletedBook) {
            res.status(200).json({ success: true, message: 'Book deleted' });
        } else {
            res.status(404).json({ success: false, message: 'Book not found' });
        }
    } catch (err) {
        res.status(400).json({ success: false, message: 'Invalid data', err: err });
    }
});

module.exports = router;
