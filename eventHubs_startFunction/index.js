
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



// const instanceId = await client.startNew('orchestrator_Master', undefined, document);
    // console.log('Started Orchestration with ID : ', instanceId);
    // await new Promise((res, rej) => { setTimeout(res('done'), Math.floor(Math.random(100, 2000) * 100)) });
    // const entityId = new df.EntityId("entityFunction", 'count4');
    // await client.signalEntity(entityId, "add", 1);
    // const stateResponse = await client.readEntityState(entityId);
    // console.log(stateResponse);
    // const response = client.createCheckStatusResponse(context.bindingData.req, instanceId);
    // const statusResponse = await utils.getStatusQuery(response.body.statusQueryGetUri);
    // await utils.storeOrchestratorResponse({instanceId, document}, response.body.statusQueryGetUri);