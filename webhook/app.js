const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
// require('@firebase/database')

const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(routes)

app.listen(port, function() {
    console.log('Starting node.js on port ' + port);
})