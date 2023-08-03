// Import
const express = require('express')
const cors = require("cors")
const config = require("./config/auth.config")
const cookieSession = require("cookie-session")
const { USERNAME,PASSWORD,DATABASE,CLUSTER } = require('./config/db.config.js')
const db = require("./models/index.js")
const session = require('express-session')



const app = express()
const PORT = 8081

var corsOptions = {
    origin: `http://localhost:${PORT}`
};

db.mongoose.connect(`mongodb+srv://${USERNAME}:${PASSWORD}@${CLUSTER}.ep77oco.mongodb.net/${DATABASE}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });



app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "persona-session",
    keys: ["FIT4002-PROJECT"], // should use as secret environment variable
    httpOnly: true
  })
);

// original route
app.get('/', (req, res) => {
  res.json({ message: "Welcome."});
})

// routes
require('./routes/auth.routes.js')(app);
require('./routes/user.routes.js')(app);


// set port, listen for requests
app.listen(PORT, (err) => {
    if (err) {
        console.error("NOT FOUND.");
    }
    console.log(`app is running on port: ${PORT}`);
  });


