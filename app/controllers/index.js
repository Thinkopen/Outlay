const config = require('config');
const express = require('express');

const log = require('../libraries/log');

class AbstractController {
  constructor() {
    this.router = express.Router();

    this.initRouter();

    this.promisifyMiddlewares();
  }

  initRouter() { // eslint-disable-line class-methods-use-this
    throw new Error('"initRouter" method must be implemented');
  }

  promisifyMiddlewares() {
    this.router.stack.forEach(({ route }) => {
      route.stack.forEach((stack) => {
        const oldHandle = stack.handle;

        // eslint-disable-next-line no-param-reassign
        stack.handle = stack.handle.constructor.name === 'AsyncFunction' ? AbstractController.wrapPromise(oldHandle) : AbstractController.wrapTryCatch(oldHandle);
      });
    });
  }

  static wrapPromise(middleware) {
    return (request, response, next) => {
      middleware(request, response, next)
        .catch(next);
    };
  }

  static wrapTryCatch(middleware) {
    return (request, response, next) => {
      try {
        middleware(request, response, next);
      } catch (error) {
        next(error);
      }
    };
  }

  static handle404(req, res, next) {
    const err = new Error(`Not found: ${req.url}`);

    err.status = 404;

    next(err);
  }

  static handle500(rawErr, req, res, next) { // eslint-disable-line no-unused-vars
    const err = typeof rawErr === 'string' ? new Error(rawErr) : rawErr;

    if (config.get('environment') !== 'test' && err.status !== 404) {
      log.server.error(err.message);
      log.debug(err.stack);
    }

    res.status(err.status || 500);
    res.json({
      error: err.message,
    });
  }
}

module.exports = AbstractController;
