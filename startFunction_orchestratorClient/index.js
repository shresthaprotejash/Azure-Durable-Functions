
const df = require('durable-functions');
const utils = require('../utils');
const etf = require('../normalFunction');

module.exports = async function (context, myQueueItem) {
  context.log('Queue StartFunc Trigger: ', myQueueItem);
  const client = df.getClient(context);
  const document = myQueueItem;
  try {
    await etf.entryFunction(document);
    await utils.logMe(document.i);
  } catch (error) {
    context.log('Error in StartFunc: ', error);
    await new Promise((res, rej) => { setTimeout(res('done'), Math.floor(Math.random(100, 2000) * 100)) });
    await utils.errorInFile(error, 'queue');
  }
};