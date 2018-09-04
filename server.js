const express = require('express')

const apiV1 = require('./routes/V1/api')

const server = express()

// Middleware
server.use(express.json())
server.use(express.urlencoded({extended: true}))

// temporary
server.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// Routes
server.use('/api/v1', apiV1)

module.exports = server
