const mongoose = require("mongoose");

const connect = mongoose.connect("mongodb://localhost:27017/MERN_API");

module.exports = connect;