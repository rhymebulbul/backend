// Import
const express = require('express')
const cors = require("cors")
const cookieSession = require("cookie-session")
const { userName,password,DB } = require('./config/db.config.js')
const db = require("./models/index.js")


const app = express()
const PORT = 8081

const user = db.user;

var corsOptions = {
    origin: `http://localhost:${PORT}`
};

db.mongoose.connect(`mongodb+srv://${userName}:${password}@${DB}.ep77oco.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
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
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true
  })
);

// original route
app.get('/', (req, res) => {
  res.json({ message: "Welcome."});
})




//post
// const bodyParser = require('body-parser')

// app.use(bodyParser.urlencoded({
//     extended: true
// }));
// app.use(bodyParser.json());
// app.post("/login", (req, res) => {
//     console.log(req.body)
//     res.json({
//         post_result:'ok',
//         body: req.body,
//     })
// })

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

function initial() {
    // let count = user.estimatedDocumentCount();
    // console.log(count);
    console.log(1);
}


