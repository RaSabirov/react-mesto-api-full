require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const { routes } = require('./routes/routes');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { PORT = 3001 } = process.env;

app.use(express.json()); // bodyparser in framework
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(req.method, req.path);
  next();
});

// app.use(cors());

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://mesto.sbrvrvl.nomoredomains.xyz',
      'https://mesto.sbrvrvl.nomoredomains.xyz',
    ],
    credentials: true,
  }),
);

app.use(requestLogger); // подключаем логгер запросов

app.use(routes); // all routes
app.use(helmet());

app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler); // централизованный обработчик ошибок

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');
  // eslint-disable-next-line no-console
  app.listen(PORT, () => console.log(`Server has been started! Listen on PORT: ${PORT} `));
}

main();
