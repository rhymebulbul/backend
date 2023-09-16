const { MongoClient } = require('mongodb');

const userName = "FIT4002";
const password = "monashFIT4002";
const domainCollectionName = "domain";

const uri = "mongodb+srv://" + userName + ":" + password + "@fit4002-team04.ep77oco.mongodb.net/?retryWrites=true&w=majority";

// Create a new MongoClient
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function getDomains() {
    var domains = null
    try {
        // Find all domains
        await client.connect();
        domains = await client.db("fit4002-project")
            .collection(domainCollectionName).find();
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
    return domains;
}

async function addDomain(name) {
    try {
        // Add new domain
        await client.connect();
        await client.db("fit4002-project")
            .collection(domainCollectionName).insertOne({ domainName: name });
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}