const express = require('express');
const cors = require('cors');
const path = require('path');

const loginRouter = require('./routes/routesLogin');
const registerRouter = require('./routes/routesRegister');
const productRouter = require('./routes/routesProducts');

// https://expressjs.com/pt-br/starter/static-files.html

const imagesUpload = path.join(__dirname, '..', '..', 'public', 'images');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/customer/products', productRouter);
app.use('/images', express.static(imagesUpload));

// app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
