const OutlayApp = require('./app/index');
const log = require('./app/libraries/log');

const expressApp = new OutlayApp();


expressApp.listen()
  .catch((error) => {
    log.error('Error while starting the application');
    log.debug(error);
  });
