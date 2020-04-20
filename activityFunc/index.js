const utils = require('../utils');

module.exports = async function (context, req) {
    try {
        const { inputData, instanceId } = req;
        console.log("Inside Activity: ", req);
        await utils.logInDB(inputData.i, instanceId);
    } catch (error) {
        console.log('Error in Activity Func: ', error);
        await utils.errorInFile(error, 'queue');
    }
};
