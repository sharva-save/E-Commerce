const mongoose = require("mongoose");
const config = require("config");
const dbgr = require("debug")("development:mongoose");

mongoose
  .connect(`${config.get("MONGODB_URI")}/ECommerce`)
  .then(function () {
    dbgr("connected");
    //     console.log("Connected");
  })
  .catch(function (err) {
    console.log(" not Connected with db", err.message);
  });

module.exports = mongoose.connection;
