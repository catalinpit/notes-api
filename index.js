const app = require('./app');
const http = require('http');
const config = require('./src/utils/config');
const logger = require('./src/utils/logger');

const server = http.createServer(app);

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});