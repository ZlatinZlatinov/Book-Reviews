const mongoose = require('mongoose');
const dbUrl = 'mongodb://127.0.0.1:27017/book-reviews';

async function connectDB() {
    try {
        mongoose.set('strictQuery', false);

        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected!');
    } catch (err) {
        console.log('Failed to connect with database!');
        console.log(err.message);
        process.exit(1);
    }
}

module.exports = {
    connectDB
}