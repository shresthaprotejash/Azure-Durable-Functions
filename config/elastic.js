const { Client } = require('@elastic/elasticsearch');
try {

    const client = new Client({ node: `https://${process.env.ELASTIC_USERNAME}:${process.env.ELASTIC_PASSWORD}@${process.env.ELASTIC_ENDPOINT_URL}` });
    module.exports = client;
} catch (error) {
    console.log("Error: ", error);
}
