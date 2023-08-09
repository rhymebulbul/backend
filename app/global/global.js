const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const gb = {};

gb.mongoose = mongoose;

gb.currentUser = require("../models/user.model.js");
gb.userId = undefined;


module.exports = gb;
