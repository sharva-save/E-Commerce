const express = require('express')
const app = express()
const db = require("./config/mongoose.connection")
const port = 3000
const ownerRouter = require('./routes/owners.router')
const ProductRouter = require('./routes/product.router')
const usersRouter = require('./routes/users.router')

app.use("/owner" , ownerRouter)
app.use("/users" , usersRouter)
app.use("/products" , ProductRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


