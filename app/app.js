// Import
const express = require('express')
const cors = require("cors")
const cookieSession = require("cookie-session")

const app = express()
const PORT = 8080
var corsOptions = {
    origin: "http://localhost:8080"
};

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
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.post("/login", (req, res) => {
    console.log(req.body)
    res.json({
        post_result:'ok',
        body: req.body,
    })
})

// set port, listen for requests
app.listen(PORT, (err) => {
    if (err) {
        console.error("NOT FOUND.");
    }
    console.log(`app is running on port: ${PORT}`);
  });