const { MongoClient } = require('mongodb');



const userName = "FIT4002";
const password = "monashFIT4002";

// const { asd } = require('./test')
// console.log(asd);
// var jsonResult = require('./public_function.js')
// jsonResult('ok','test');



const uri = "mongodb+srv://" + userName + ":" + password + "@fit4002-team04.ep77oco.mongodb.net/?retryWrites=true&w=majority";

// Create a new MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("fit4002-project").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    await  listDatabases(client);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};