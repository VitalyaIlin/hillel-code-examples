import express from 'express';
import { ValidationError, Unauthorized } from './errorHandler.js';

const app = express();

app.use(express.json());

const users = [];

function isAuth(req, res, next) {
    const userId = req.header('x-user-id');
    console.log('userId', userId);
    if (!userId) {
        throw new Unauthorized('Missing header: x-user-id');
    }

    next();
};

function customMiddleware(req, res, next) {
    console.log(123);
    next();
}

app.get('/protected', isAuth, customMiddleware, (req, res) => {
    res.status(200).json({
        message: 'Hello, Client! I am protected endpoint',
    })
});

app.get('/not-protected', customMiddleware, (req, res) => {
    res.status(200).json({
        message: 'Hello, Client! I am NOT protected endpoint',
    })
});

app.post('/signup', (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        throw new ValidationError('Email is required');;
    }
    const newUser = {
        email, password
    };
    users.push(newUser);
    res.status(201).json({
        user: newUser
    });
});

app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(err.statusCode || 500).json({
        message: `Error: ${err.message}`,
    });
    next();
});

app.listen(process.env.PORT, () => {
    console.log(`Server is working on port ${process.env.PORT}`);
});