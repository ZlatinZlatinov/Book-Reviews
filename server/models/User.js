const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: String,
        required: true,
    },
    hashedPassword: {
        type: String,
        required: true
    },
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
});

userSchema.index({ email: 1 },
    {
        collation: {
            locale: 'en',
            strength: 2
        }
    });

const User = model('User', userSchema);

module.exports = User;
