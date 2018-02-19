const express = require('express')
const logger = require  ('morgan')
const bodyParser = require('body-parser')
const app = express()
const user_routes = require('./routes/user')

app.use(logger('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('*', (req,res) => res.status(200).send({
  message: 'Catch-all route reached Software Engineering!'
}))

app.get('/users', user_routes)

module.exports = app;
