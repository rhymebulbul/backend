const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw new Error("Authentication failed!");
    }
    const decodedToken = jwt.verify(token, "2dd_super_secret_key");
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (Err) {
    const error = new HttpError("Authentication failed!", 403);
    return next(error);
  }
};
