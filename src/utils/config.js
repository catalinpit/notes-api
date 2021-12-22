require('dotenv/config');

const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;
const DB_URI_TEST = process.env.DB_URI_TEST;

module.exports = { PORT, DB_URI, DB_URI_TEST };