const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.domain = require("./domain.model");
db.factor = require('./factor.model');
db.persona = require('./persona.model')


module.exports = db;