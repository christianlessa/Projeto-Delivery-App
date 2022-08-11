const express = require('express');
const cors = require('cors');
const path = require('path');

const loginRouter = require('./routes/routesLogin');
const registerRouter = require('./routes/routesRegister');
const productRouter = require('./routes/routesProducts');
const orderRouter = require('./routes/routesOrder');
const sellerRouter = require('./routes/routesSellers');
const error = require('./middlewares/errorMiddleware');

// https://expressjs.com/pt-br/starter/static-files.html

const imagesUpload = path.join(__dirname, '..', '..', 'public', 'images');

const app = express();

app.use(express.json());
app.use(cors());

app.use(loginRouter);
app.use(registerRouter);
app.use(productRouter);
app.use(orderRouter);
app.use(sellerRouter);

app.use(error);

app.use('/images', express.static(imagesUpload));

// app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
