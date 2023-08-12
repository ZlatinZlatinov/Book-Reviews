// TODO: require the item:  
const Book = require('../models/Book');
const { createComment } = require('./commentsService');

async function loadAllBooks() {
    return Book.find({}).lean();
}

async function getBookByName(name) {
    return Book.find({ name }); // returns an array
}

async function getBookById(id) {
    return Book.findById(id).populate('comments');
}

async function createBook(data) {
    const today = new Date();
    const createdAt = today.getDate();
    const payload = { ...data, createdAt };

    return Book.create(payload);
}

async function updateBook(bookId, payload) {
    return Book.findById(bookId).then((book) => {
        book.title = payload.title;
        book.author = payload.author;
        book.genre = payload.genre;
        book.img = payload.img;
        book.review = payload.review;

        return book.save()
    });
}

async function deleteBook(id) {
    return Book.findByIdAndDelete(id).then();
}

async function likeBook(bookId, userId) {
    const book = await Book.findById(bookId);

    if (book.likes.includes(userId)) {
        throw new Error('You have already liked this book!');
    }

    book.likes.push(userId);

    return book.save();

}

async function commentBook(bookId, commentData) {
    const book = await getBookById(bookId);
    const comment = await createComment(commentData);

    book.comments.push(comment._id);
    await book.save();

    return comment;
}

async function getBookComments(bookId) {
    const book = await getBookById(bookId);

    return book.comments;
}

async function getTopRated() {
    const books = await Book.find({}).lean()//.where('likes'); 

    return books.filter(b => b.likes.length > 0);
}

module.exports = {
    loadAllBooks,
    getBookById,
    getBookByName,
    createBook,
    updateBook,
    deleteBook,
    likeBook,
    commentBook,
    getBookComments,
    getTopRated
}