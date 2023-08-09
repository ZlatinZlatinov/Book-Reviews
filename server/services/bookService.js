// TODO: require the item:  
const Book = require('../models/Book');

async function loadAllBooks() {
    return Book.find({}).lean();
}

async function getBookByName(name) {
    return Book.find({ name }); // returns an array
}

async function getBookById(id) {
    return Book.findById(id);
}

async function createBook(data) {
    const today = new Date();
    const createdAt = today.getDate();
    const payload = { ...data, createdAt };

    return Book.create(payload);
}

async function updateBook() {
    //Book.findById(it).then((itmem) => { ... item.save()});
}

async function deleteBook(id) {
    Book.findByIdAndDelete(id).then();
}

module.exports = {
    loadAllBooks,
    getBookById,
    getBookByName,
    createBook,
    updateBook,
    deleteBook
}