require('dotenv').config();
const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const mainRoutes = require('./routes/index');
const { rateLimiter } = require('./middlewares/rate-limiter');
const { errorHandler } = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const whiteList = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'https://maxim.nomoredomains.club',
  'http://maxim.nomoredomains.club',
  'maxim.nomoredomains.club',
  'https://api.maxim.nomoredomains.club',
  'http://api.maxim.nomoredomains.club',
  'api.maxim.nomoredomains.club',
  'https://localhost:3000',
  'http://localhost:3000',
  'localhost:3000',
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log(origin);

    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

const app = express();
app.use(cors(corsOptions));
mongoose.set('strictQuery', false);
const { PORT = 3005, MONGO_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

app.use(rateLimiter);
app.use(helmet());
app.disable('x-powered-by');

app.use(express.json());
app.use(requestLogger);

app.use(mainRoutes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

async function main() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await app.listen(PORT);
  console.log(`App listening on port ${PORT}`);
}
main();
