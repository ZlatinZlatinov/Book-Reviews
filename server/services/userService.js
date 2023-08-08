const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const secret = 'suiiiii';
const blackList = new Set();

async function register(email, username, password) {
    const existing = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });

    if (existing) {
        throw new Error('Email is already taken!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const time = new Date();

    const user = await User.create({
        email,
        username,
        createdAt: time.getTime(),
        hashedPassword
    });

    return createToken(user);
}

async function login(email, password) {
    const user = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });

    if (!user) {
        throw new Error('Wrong email or password!');
    }

    const hashedPassword = user.hashedPassword;
    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
        throw new Error('Wrong email or password');
    }

    return createToken(user);
}

async function logout(token) {
    blackList.add(token);
}

function pareseToken(token) {
    if (blackList.has(token)) {
        throw new Error('Token is blacklisted!');
    }

    return jwt.verify(token, secret);
}

function createToken(user) {
    const payload = {
        id: user._id,
        email: user.email,
        username: user.username
    }

    return {
        _id: user._id,
        email: user.email,
        username: user.username,
        accessToken: jwt.sign(payload, secret)
    }
}

async function addToFavorites(bookId, userId) {
    const user = await User.findById(userId);

    if (user.favorites.includes(bookId)) {
        throw new Error('You have already added this book to your favourites list!')
    }

    user.favorites.push(bookId);

    await user.save();
}

module.exports = {
    register,
    login,
    logout,
    pareseToken,
    addToFavorites
}