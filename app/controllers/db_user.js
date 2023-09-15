const { MongoClient } = require('mongodb');

const userName = "FIT4002";
const password = "monashFIT4002";
const userCollectionName = "user";

const uri = "mongodb+srv://" + userName + ":" + password + "@fit4002-team04.ep77oco.mongodb.net/?retryWrites=true&w=majority";

// Create a new MongoClient
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function getUser(username, pwd) {
    var user = null
    try {
        // Find user by username
        await client.connect();
        user = await client.db("fit4002-project")
            .collection(userCollectionName).findOne({ userName: username, password: pwd });
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
    return user;
}

async function signUpUser(username, pwd) {
    try {
        // Find user by username
        await client.connect();
        user = await client.db("fit4002-project")
            .collection(userCollectionName).insertOne({ userName: username, password: pwd });
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}