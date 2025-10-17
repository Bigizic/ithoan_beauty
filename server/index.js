require('dotenv').config();
const express = require('express');
const chalk = require('chalk');
const cors = require('cors');
const helmet = require('helmet');

const keys = require('./config/keys');
const routes = require('./routes');
const socket = require('./socket');
const setupDB = require('./utils/db');
const emailWorker = require('./workers/emailWorker');
const cookieParser = require('cookie-parser')

const { port } = keys;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  helmet({
    contentSecurityPolicy: false,
    frameguard: true
  })
);

const allowedOrigins = [
  'http://tohannieesskincare.com',
  'https://tohannieesskincare.com',
  'http://www.tohannieesskincare.com',
  'https://www.tohannieesskincare.com',
  'http://beauty.tohannieesskincare.com',
  'https://beauty.tohannieesskincare.com',
  'http://localhost:8080',
  'http://localhost:5173',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('not allowed by cors'));
    }
  },
  credentials: true,
}));
app.use(cookieParser());

setupDB();
require('./config/passport')(app);
app.use(routes);

const server = app.listen(port, () => {
  console.log(
    `${chalk.green('✓')} ${chalk.blue(
      `Listening on port ${port}. Visit http://localhost:${port}/ in your browser.`
    )}`
  );
});


socket(server);
