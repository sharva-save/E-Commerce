const express = require('express')
const app = express()
const db = require("./config/mongoose.connection")
const port = 3000
const expressSession =require("express-session")
const path = require('path')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
require("dotenv").config();
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret:process.env.EXPRESS_SESSION_SECRET,
}))
app.use(express.urlencoded({extended: true}));
app.use(flash())
app.use(express.static(path.join(__dirname, "public")))
app.set("view engine", 'ejs')
app.use(cookieParser());
const indexRouter = require('./routes/index')
const ownerRouter = require('./routes/owners.router')
const ProductRouter = require('./routes/product.router');
const usersRouter = require('./routes/users.router')

app.use("/", indexRouter)
app.use("/owner", ownerRouter)
app.use("/users", usersRouter)
app.use("/products", ProductRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
