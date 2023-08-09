const config = require("../config/auth.config");
const db = require("../models");
const gb = require("../global/global.js");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
    personas: []
  });
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send({ 
        message: "User was registered successfully!",
    });
     
    });
};


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
    
        const token = jwt.sign({ id: user.id },
                                config.secret,
                                {
                                    algorithm: 'HS256',
                                    allowInsecureKeySizes: true,
                                    expiresIn: 86400, // 24 hours
                                });
    
        req.session.token = token;

        gb.currentUser = new User({
            username: user.username,
            password: undefined,
            personas: user.personas
        })

        gb.userId = user.id

        console.log(gb.currentUser,gb.userId)
    
        res.status(200).send({
            id: user._id,
            username: user.username,
        });
        });
};

exports.signout = async (req, res) => {
    try {
        req.session = null;
        return res.status(200).send({ message: "You've been signed out!" });
    } catch (err) {
        this.next(err);
    }
    };