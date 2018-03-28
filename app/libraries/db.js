const fs = require('fs');
const path = require('path');
const config = require('config');
const Sequelize = require('sequelize');

const log = require('./log');

const configDb = Object.assign({}, config.get('database'));
configDb.logging = message => log.db.debug(message);

if (configDb.dialect === 'sqlite' && !configDb.storage) {
  configDb.storage = path.join(__dirname, '..', '..', `${configDb.database}.db`);
}

let { url } = configDb;
if (url && configDb.dialect === 'postgres' && configDb.dialectOptions && configDb.dialectOptions.ssl && !url.includes('?ssl=')) {
  url += '?ssl=true';
}

const sequelize = url ? new Sequelize(url, configDb) : new Sequelize(configDb);

async function sync(options) {
  const modelsFolder = path.join(__dirname, '..', 'models');

  fs
    .readdirSync(modelsFolder)
    .filter(filename => filename !== 'index.js' && filename.substr(-3) === '.js')
    // eslint-disable-next-line import/no-dynamic-require, global-require
    .forEach(filename => require(path.join(modelsFolder, filename)));

  return sequelize.sync(options);
}

module.exports = { Sequelize, sequelize, sync };
