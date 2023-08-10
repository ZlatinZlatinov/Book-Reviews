const { body, validationResult } = require('express-validator');
const { erorParser } = require('../utils/erorParser');
const { hasUser } = require('../middlewares/guards');
const { loadAllBooks, createBook, getBookById, deleteBook, likeBook } = require('../services/bookService');
const { addToFavorites } = require('../services/userService');

const bookController = require('express').Router();

bookController.get('/catalog', async (req, res) => {
    const books = await loadAllBooks();
    res.json(books);
});

bookController.post('/create',
    hasUser(),
    body('img').isURL().withMessage('Img must be a valid URL address!'),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);
            if (errors.length > 0) {
                throw errors;
            }

            const data = Object.assign({ ownerId: req.user.id }, req.body);
            const createdItem = await createBook(data);
            res.status(201).json(createdItem);
        } catch (err) {
            const message = erorParser(err);
            res.status(400).json({ message });
        }
    });


bookController.get('/catalog/:id', async (req, res) => {
    //to do: add error handlig
    const id = req.params.id;
    try {
        const item = await getBookById(id);
        res.json(item);

    } catch (err) {
        res.status(404).json({ message: 'No such book!' });
    }
});


bookController.put('/edit', hasUser(), async (req, res) => {

});

bookController.delete('/delete/:id', hasUser(), async (req, res) => {
    const id = req.params.id;

    try {
        await deleteBook(id);
        res.status(204).json({ message: 'Book deleted!' });
    } catch (err) {
        res.status(404).json({ message: 'No such book!' });
    }
});


bookController.post('/favorites', hasUser(), async (req, res) => {
    const bookId = req.body.bookId;
    const userId = req.user.id;

    try {
        await addToFavorites(bookId, userId);
        res.status(200).json({ message: 'Book added Successfully!' })
    } catch (err) {
        res.status(400).json({ message: err.message });
    }

});

bookController.post('/likes', hasUser(), async (req, res) => {
    const bookId = req.body.bookId;
    const userId = req.user.id;

    try {
        await likeBook(bookId, userId);
        res.json({ message: 'Book successfuly liked!' });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
});

module.exports = bookController;