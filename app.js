const { PORT } = require('./src/utils/config');
const express = require('express');
require('express-async-errors');
const cors = require('cors');
const { errorHandler, unknownEndpoint, reqLogger } = require('./src/middleware/handlers');
const logger = require('./src/utils/logger');
require('./src/db/mongoose');
const personRouter = require('./src/controllers/notes');
const usersRouter = require('./src/controllers/users');

const app = express();

app.use(express.json());
app.use(cors());
app.use(reqLogger);
app.use('/api/notes', personRouter);
app.use('/api/users', usersRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;