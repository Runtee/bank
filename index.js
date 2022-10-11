require('dotenv').config()
const express = require('express')
const app = express()
const router = require('./router')
// const error = require('./middleware/error')
// const cors = require("cors")
const bodyParser = require("body-parser")
const { up:up1 } = require('./migrations/transactions')
const database_connection = require('./config/database_connection')
// app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(error)
// router(app);
up1(database_connection)
// up2(database_connection)

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})