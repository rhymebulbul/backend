const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
// const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  // Since you're using 'Bearer TOKEN' format, you should split and get the actual token
  token = token.split('Bearer ')[1];

  jwt.verify(token,
    config.secret,
    (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }
      req.userId = decoded.id;
      next();
    });
};


const authJwt = {
  verifyToken
};
module.exports = authJwt;