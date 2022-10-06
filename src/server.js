require('dotenv').config();
const express = require('express');
require("express-async-errors");
const app = express();
const PORT = process.env.PORT;

const authMiddleware = require('./middlewares/auth');
const UserController = require('./Controllers/UserController');
const errorHandler = require('./shared/errors/errorHandler');

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Aula 9' });
});

app.post('/user/register', UserController.register);
app.post('/user/authenticate', UserController.authenticate);
app.get('/user/me', authMiddleware, UserController.me);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});
