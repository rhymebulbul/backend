const db = require("../models");
const User = db.user;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  // Username
  const user = await User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }
    next();
  });
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail
};

module.exports = verifySignUp;