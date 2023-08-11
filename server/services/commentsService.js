const Comment = require('../models/Comment');

async function createComment(data) {
    const today = new Date();
    const createdAt = today.getTime();
    const payload = { ...data, createdAt };

    return Comment.create(payload);
} 

module.exports = {
    createComment
}