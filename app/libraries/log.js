const config = require('config');
const moment = require('moment');
const winston = require('winston');

// Log levels:
// { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }

function timestamp() {
  return moment().format('YYYY-MM-DD HH:mm:ss.SSS Z');
}

function loggerFactory(label) {
  return new winston.Logger({
    transports: [
      new winston.transports.Console({
        colorize: true,
        json: false,
        stringify: true,
        label,
        level: config.get('log.level'),
        timestamp,
      }),
    ],
  });
}

/**
 * @typedef {{
 *  error: Function,
 *  warn: Function,
 *  info: Function,
 *  verbose: Function,
 *  debug: Function,
 *  silly: Function}} Logger
 */

/**
 * @type {{
 *  error: Function,
 *  warn: Function,
 *  info: Function,
 *  verbose: Function,
 *  debug: Function,
 *  silly: Function,
 *
 *  default: Logger,
 *  server: Logger,
 *  db: Logger}}
 */
const log = {};

config.get('log.labels').forEach((label) => {
  log[label] = loggerFactory(label);
});

Object.keys(log.default.levels).forEach((level) => {
  log[level] = log.default[level];
});

module.exports = log;
