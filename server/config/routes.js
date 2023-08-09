const authController = require("../controllers/authController");
const bookController = require("../controllers/bookController");


module.exports = (app) => {
    app.use('/auth', authController);
    app.use('/books', bookController);
}