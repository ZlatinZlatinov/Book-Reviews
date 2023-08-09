const { body, validationResult } = require('express-validator');
const { register, login, logout } = require('../services/userService');
const { erorParser } = require('../utils/erorParser');

const authController = require('express').Router();

authController.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const token = await login(email, password);
        res.json(token);
    } catch (err) {
        const message = erorParser(err);
        res.status(401).json({ message });
    }
});

authController.post('/register',
    body('email').trim().toLowerCase().isEmail()
        .withMessage('Ivalid email address!'),
    body('username').trim().toLowerCase().isLength({ min: 5 })
        .withMessage('Username should be atleast 5 characters long!'),
    body('password').trim().isLength({ min: 6 })
        .withMessage('Password should be at least 6 characters long!'),
    async (req, res) => {
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;

        try {
            const { errors } = validationResult(req);

            if (errors.length > 0) {
                throw errors;
            }

            const token = await register(email, username, password);
            res.json(token);
        } catch (err) {
            const message = erorParser(err);
            res.status(400).json({ message });
        }
    }
);

authController.post('/logout', async (req, res) => {
    const token = req.token;

    await logout(token);
    res.status(204).end();
});

module.exports = authController;