const { LoggingBunyan } = require('@google-cloud/logging-bunyan');

const bunyan = require('bunyan');

const loggingBunyan = new LoggingBunyan();

const logger = bunyan.createLogger({
    name: 'cc-project',
    streams: [
      {stream: process.stdout, level: 'info'},
      loggingBunyan.stream('info'),
    ],
  });

const logRequest = function(req,res,next) {
  logger.info('Request from:'+req.header['user-agent'] + ':' + req.get('host') + 'to:' + req.method + ' ' + req.url);
  next();
}

module.exports = {
    logger,
    logRequest
}