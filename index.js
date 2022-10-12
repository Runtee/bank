require('dotenv').config()
const express = require('express')
const app = express()
const router = require('./router')
// const error = require('./middleware/error')
// const cors = require("cors")
const bodyParser = require("body-parser")
// app.use(cors())
app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(error)
router(app);
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})