/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const azure = require('azure-storage');
const Promise = require('bluebird');

module.exports.initTableService = (config = {}) => {
  const tableSvc = azure
    .createTableService(
      config.AZURE_STORAGE_ACCOUNT || process.env.AZURE_STORAGE_ACCOUNT,
      config.AZURE_STORAGE_ACCESS_KEY || process.env.AZURE_STORAGE_ACCESS_KEY,
    );
  tableSvc.entityToJSON = (entities) => {
    if (entities.length) {
      for (let i = 0; i < entities.length; i++) {
        const entity = entities[i];
        for (const key in entity) {
          entity[key] = entity[key]._ || entity[key];
        }
      }
    }
    return (entities);
  };
  tableSvc.upperCap = (str) => {
    const str1 = String(str);
    const lastChar = str1.slice(-1, str1.length);
    const beginChar = str1.slice(0, -1);
    const newLastChar = String.fromCharCode(lastChar.charCodeAt(0) + 1);
    return (beginChar + newLastChar)
      .replace(/\s/g, '');
  };
  return Promise.promisifyAll(tableSvc);
};
