const User   = require('../models').users
const bcrypt = require('bcryptjs')

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

  let {id} = req.params

  User.findById(id)
    .then((user) => {
      res.status(200).json(user)
    })
    .catch((err) => {
      res.status(400).json(err)
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
      coach           :  coach,
      language        :  language
    })
    .then((user) => {
      res.status(200).json(user)
    })
    .catch((err) => {
      res.status(400).json({error:"Unable to create user"})
    })

}

exports.update = (req, res, next) => {

  let { username, email, coach, id } = req.body

  User.findById(id)
    .then((user) => {
      return user.update({
        username        :  username,
        email           :  email,
        coach           :  coach
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
      res.status(400).json({error: "Unable to update user"})
    })

}
