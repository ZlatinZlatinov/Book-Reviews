const { body, validationResult } = require('express-validator');
const { erorParser } = require('../utils/erorParser');
const { hasUser } = require('../middlewares/guards');
const { loadAllBooks, createBook, getBookById } = require('../services/bookService');

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

            const data = Object.assign({ ownerId: req.user._id }, req.body);
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
    const item = await getBookById(id);
    res.json(item);

});


bookController.put('/edit', async (req, res) => {

});

bookController.delete('/delete', async (req, res) => {

});

module.exports = bookController;