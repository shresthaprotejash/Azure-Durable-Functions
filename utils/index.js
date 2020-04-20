const table = require('../config/tableStorage').initTableService({});
const uuid = require('uuid/v4');
const rp = require('request-promise');
const elastic = require('../config/elastic');

exports.logInDB = async (data) => {
    const rowKey = `${data}_${uuid()}`;
    const entry = {
        PartitionKey: { _: 'test' },
        RowKey: { _: rowKey }
    }
    console.log(entry);
    await table.insertEntityAsync('PPETable', entry, null);
}

exports.errorInFile = async (data, errorFrom) => {
    try {
        const rowKey = `${errorFrom}_${uuid()}`;
        const entry = {
            PartitionKey: { _: 'test' },
            RowKey: { _: rowKey }
        }
        console.log(entry);
        await table.insertEntityAsync('errorTable', entry, null);
        const options = {
            method: 'POST',
            uri: process.env.WebhookURL,
            body: {
                message: JSON.stringify(data),
                from: errorFrom
            },
            json: true,
        };
        const response = await rp(options)
        console.log(response);
    } catch (error) {
        console.log('Error in ErrorLog: ', error);

    }
}

exports.storeOrchestratorResponse = async (data, uri) => {
    console.log(data);
    const { instanceId, document } = data;

    const rowKey = `${document.i}_${instanceId}_${uuid()}`;

    const entry = {
        PartitionKey: { _: 'test' },
        RowKey: { _: rowKey },
        // name: { _: name },
        uri: { _: uri },
        // instanceId: { _: instanceId },
        // runtimeStatus: { _: runtimeStatus },
        // customStatus: { _: customStatus },
        // output: { _: output },
        // input: { _: JSON.stringify(input) },
        // createdTime: { _: new Date(createdTime) },
        // lastUpdatedTime: { _: new Date(lastUpdatedTime) }
    }
    console.log(entry);
    await table.insertEntityAsync('orchestratorClientLogs', entry, null);
}

exports.getStatusQuery = async (uri) => {
    const options = {
        method: 'GET',
        uri,
    };
    const response = await rp(options)
    console.log(response);
    return response;
}

exports.logMe = async (data) => {
    const rowKey = `${data}_${uuid()}`;
    const entry = {
        PartitionKey: { _: 'test' },
        RowKey: { _: rowKey }
    }
    console.log(entry);
    await table.insertEntityAsync('logme', entry, null);
}

exports.callEntityFuntion = async (data) => {
    try {
        console.log(data);
        await elastic.create({
            id: data.i,
            index: `count1`,
            type: 'count',
            body: JSON.stringify(data)
        });
    } catch (error) {
        console.log("Error in Elastic: ", error);
    }
}