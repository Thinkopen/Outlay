const OutlayApp = require('./app/index');
const log = require('./app/libraries/log');

const outlayApp = new OutlayApp();


outlayApp.listen()
  .catch((error) => {
    log.error('Error while starting the application');
    log.debug(error);
  });
