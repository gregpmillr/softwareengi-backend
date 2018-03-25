const User   = require('../models').users
const Plan  = require('../models').plans
const Team = require('../models').teams
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config/jwtConfig')

exports.getAll = (req, res, next) => {

  User.findAll({})
    .then((users) => {
      res.status(200).json(users)
    })
    .catch((err) => {
      res.status(400).json(err)
    })

}

exports.get = (req, res, next) => {

  let {username} = req.params

  User.findOne({
    where: {
      username:username
    },
    include: [ Plan, Team ]
  })
  .then((user) => {
    // here we have access to the users, their plans and user_plans
    res.status(200).json( { plan_length:Object.keys(user.plans).length, team_length: Object.keys(user.teams).length } )
  })
  .catch((err) => {
    res.status(400).json(err);
  })

}

exports.create = (req, res, next) => {
  let { username, password, email, coach, language } = req.body
  let password_digest = bcrypt.hashSync(password, 10)

  User
    .create({
      username        :  username,
      email           :  email,
      password_digest :  password_digest,
      coach           :  coach === "true" ? 1 : 0,
      language        :  language
    })
    .then((user) => {
      let token = jwt.sign({
        id: user.id,
        username: user.username,
        email: user.email,
        coach: user.coach
      }, config.jwtSecret)
      res.status(200).json({token: token})
    })
    .catch((err) => {
      console.log(err)
      res.status(400).json({error:"Unable to create user"})
    })

}

exports.update = (req, res, next) => {

  let { username, email, language, coach } = req.body

  User.findOne({
    where: {
      username: username
    }
  })
  .then((user) => {
    return user.update({
      username        :  username,
      email           :  email,
      coach           :  coach,
      language        :  language
    })
    .then((user) => {
      return user
    })
    .catch((err) => {
      throw err
    })
  })
  .then((user) => {
    res.status(200).json(user)
  })
  .catch((err) => {
    console.log(err)
    res.status(400).json({error: "Unable to update user"})
  })

}

exports.update_coach = (req,res,next) => {
  let { coach, id } = req.body

  User.findById(id)
    .then((user) => {
      return user.update({
        coach: coach
      })
      .then((user) => {
        return user
      })
      .catch((err) => {
        throw err
      })
    })
    .then((user) => {
      res.status(200)
    })
    .catch((err) => {
      res.status(400)
    })
}
