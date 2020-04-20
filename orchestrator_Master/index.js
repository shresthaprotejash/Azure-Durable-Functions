const df = require('durable-functions');

module.exports = df.orchestrator(function* (context) {
  try {
    const inputData = context.df.getInput();
    const instanceId = context.df.instanceId;
    console.log('Instance idL  ', instanceId);
    yield context.df.callActivity('activityFunc', { inputData, instanceId });
  } catch (error) {
    console.log('Error in MAster: ', error);
  }
});
