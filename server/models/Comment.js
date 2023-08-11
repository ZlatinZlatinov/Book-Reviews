const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Number,
        required: true
    },
    ownerName: {
        type: String,
        required: true
    },
    ownerId: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;