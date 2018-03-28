const fs = require('fs');
const http = require('http');
const path = require('path');
const config = require('config');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');

const AbstractController = require('./controllers');

const { sync } = require('./libraries/db');
const log = require('./libraries/log');

class TodoApp {
  constructor() {
    this.config = config.get('server');

    this.initServer();
    this.initMiddlewares();
    this.initRoutes();
  }

  initServer() {
    this.app = express();
    this.server = http.Server(this.app);

    this.server.on('error', error => TodoApp.handleServerError(error));

    log.silly('Server initialized');
  }

  static handleServerError(error) {
    log.error('Server error');
    log.debug(error.message);
  }

  initMiddlewares() {
    this.app.use(morgan('dev', {
      skip: (req, res) => res.statusCode >= 400,
      stream: { write: message => log.server.info(message) },
    }));

    this.app.use(morgan('dev', {
      skip: (req, res) => res.statusCode < 400,
      stream: { write: message => log.server.warn(message) },
    }));

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));

    log.silly('Middlewares initialized');
  }

  initRoutes() {
    const controllersDir = path.join(__dirname, 'controllers');

    fs
      .readdirSync(controllersDir)
      .filter(filename => filename !== 'index.js' && filename.substr(-3) === '.js')
      .forEach((filename) => {
        const controllerFile = path.join(controllersDir, filename);
        // eslint-disable-next-line global-require, import/no-dynamic-require
        const Controller = require(controllerFile);

        this.app.use('/', new Controller().router);
      });

    this.app.use(AbstractController.handle404);
    this.app.use(AbstractController.handle500);

    log.silly('Routes initialized');
  }

  async listen() {
    await sync();
    log.silly('Database synced');

    await new Promise((resolve, reject) =>
      this.server.listen(this.config.port, err => (err ? reject(err) : resolve())));

    log.info(`Server listening on port ${this.config.port}`);
  }

  async close() {
    await new Promise((resolve, reject) =>
      this.server.close(err => (err ? reject(err) : resolve())));
  }
}

module.exports = TodoApp;
