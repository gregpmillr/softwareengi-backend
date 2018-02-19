const express          = require('express')
const logger           = require  ('morgan')
const bodyParser       = require('body-parser')
const app              = express()
const users_routes     = require('./routes/users')
const teams_routes     = require('./routes/teams')
const plans_routes     = require('./routes/plans')
const auth_routes      = require('./routes/auth')
const exercises_routes = require('./routes/exercises')

app.use(logger('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/users', users_routes)
app.use('/teams', teams_routes)
app.use('/plans', plans_routes)
app.use('/exercises', exercises_routes)
app.use('/auth', auth_routes)

module.exports = app;
