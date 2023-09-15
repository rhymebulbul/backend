const config = require("../config/auth.config");
const db = require("../models");
const gb = require("../global/global.js");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// Create & register a new user
exports.signup = (req, res) => {
    const user = new User({
        username: req.body.username,                      // Set Username
        password: bcrypt.hashSync(req.body.password, 8),  // Set Password
    });
    // Save User
    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        // Confirm user registration
        res.send({
            message: "User was registered successfully!",
        });

    });
};

exports.changePassword = async (req, res) => {
    await User.updateOne({
        username: req.body.username,
    }, { password: bcrypt.hashSync(req.body.password, 8) }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        res.send({
            message: "User changed password successfully!",
        });

    });
};


// Sign in for registered users
exports.signin = async (req, res) => {
    await User.findOne({
        username: req.body.username,
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({ message: "Invalid Password!" });
        }
        // Validate User for 24 hours
        const token = jwt.sign({ id: user.id },
            config.secret,
            {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: 86400, // 24 hours
            });

        // Instead of setting it in the session, we set the Authorization header with the token
        res.header('Authorization', 'Bearer ' + token);

        gb.currentUser = new User({
            username: user.username,
            password: undefined,
            personas: user.personas
        })

        gb.userId = user.id

        console.log(gb.currentUser, gb.userId)

        res.status(200).send({
            id: user._id,
            username: user.username,
            message: "Authentication successful!"
        });
    });
};

// Allow user to signout
exports.signout = async (req, res) => {
    try {
        req.session = null;
        return res.status(200).send({ message: "You've been signed out!" });
    } catch (err) {
        this.next(err);
    }
};