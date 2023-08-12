const { body, validationResult } = require('express-validator');
const { erorParser } = require('../utils/erorParser');
const { hasUser } = require('../middlewares/guards');
const {
    loadAllBooks, createBook, getBookById,
    deleteBook, likeBook, commentBook,
    getBookComments, updateBook, getTopRated
} = require('../services/bookService');
const { addToFavorites, getUserFavorites } = require('../services/userService');

const bookController = require('express').Router();

bookController.get('/catalog', async (req, res) => {
    const books = await loadAllBooks();
    res.json(books);
});

bookController.post('/create',
    hasUser(),
    body('img').trim().isURL().withMessage('Img must be a valid URL address!'),
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
    const id = req.params.id;
    try {
        const item = await getBookById(id);
        res.json(item);

    } catch (err) {
        res.status(404).json({ message: 'No such book!' });
    }
});


bookController.put('/edit/:id', hasUser(), async (req, res) => {
    const bookId = req.params.id;
    const payload = req.body;

    try {
        const updatedBook = await updateBook(bookId, payload);
        res.json(updatedBook);
    } catch (err) {
        const message = erorParser(err);
        res.status(409).json({ message });
    }
});

bookController.delete('/delete/:id', hasUser(), async (req, res) => {
    const id = req.params.id; //bookID

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

bookController.post('/comments', hasUser(), async (req, res) => {
    const bookId = req.body.bookId;
    const text = req.body.text;

    const ownerId = req.user.id;
    const ownerName = req.user.username;

    try {
        const comment = await commentBook(bookId, { ownerId, ownerName, text });
        res.json(comment);

    } catch (err) {
        const message = erorParser(err);
        res.status(406).json({ message });
    }
})

bookController.get('/comments/:id', async (req, res) => {
    const bookId = req.params.id;

    try {
        const comments = await getBookComments(bookId);
        res.json(comments);

    } catch (err) {
        res.status(404).json({ message: 'No Comments!' });
    }
})

bookController.get('/favorites', hasUser(), async (req, res) => {
    const userId = req.user.id;

    try {
        const favoritesArray = await getUserFavorites(userId);
        res.json(favoritesArray);
    } catch (err) {
        const message = erorParser(err);
        res.status(404).json({ message });
    }
})

bookController.get('/top', async (req, res) => {
    try {
        const topBooks = await getTopRated();
        res.json(topBooks);
    } catch (err) {
        res.status(404).json({ message: 'Not content found!' });
    }

})

module.exports = bookController;