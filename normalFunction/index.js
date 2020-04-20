const utils = require('../utils');

exports.entryFunction = async (data) => {
    await utils.logInDB('function');
    await utils.callEntityFuntion(data);
}