const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/ECommerce")
.then(function () {
               console.log("Connected");
               
})
.catch(function(err){
               console.log(" not Connected with db",err.message);
})

module.exports = mongoose.connection;