import express from 'express';
import { ApiError, Unauthorized } from './errorHandler.js';
const app = express();

// app.use((req, res, next) => {
//     console.log(req.headers['x-user-id']);
//     if (!req.headers['x-user-id']) {
//        return res.status(401).send('Unauthorized');
//     }
//     next();
// });

function checkUserRole(req, res, next) {
    console.log('req.userId', req.userId);
    if (req.userId === 1) {
        return next();
    }

    res.status(403).send('Forbidden');
}

function isAuth(req, res, next) {
    console.log('From middleware', req.headers['x-user-id']);
    if (!req.headers['x-user-id']) {
        throw new Unauthorized('Unauthorized. Creadentials are invalid');
    //    return res.status(401).send('Unauthorized');
    }
    req.userId = +req.headers['x-user-id'];
    next();
}

app.get('/product/:id', (req, res) => {
    console.log('product endpoint 1');

    if (+req.params.id !== 123) {
        // const err = new Error('Product with such id is not founnd');
        // err.statusCode = 404;
        // throw err;

        throw new ApiError(404, 'Product with such id is not founnd');
    }

    res.status(200).send('OK');
});

app.get('/cart/:id', isAuth, (req, res) => {
    console.log('cart endpoint 1');

    res.status(200).send('OK');
});

app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        message: error.message,
    });
});

app.listen(3000, () => {
    console.log('App is running on port 3000');
});