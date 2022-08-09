const express = require('express');
const cors = require('cors');

const loginRouter = require('./routes/routesLogin');
const registerRouter = require('./routes/routesRegister');
const productRouter = require('./routes/routesProducts');
const orderRouter = require('./routes/routesOrder');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/customer/products', productRouter);
app.use('/orders', orderRouter);

// app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
