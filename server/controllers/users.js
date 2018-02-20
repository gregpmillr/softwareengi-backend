const User   = require('../models').users
const bcrypt = require('bcryptjs')

exports.getAll = (req, res, next) => {
  console.log('get all')
}

exports.get = (req, res, next) => {
  User.findById(req.params.id)
    .then(
      user => {
        console.log(user);
      }
    )
}

exports.create = (req, res, next) => {

  const { username, password } = req.body
  const password_digest        = bcrypt.hashSync(password, 10)

  return User
          .create({
            username:        req.body.username,
            email:           req.body.email,
            password_digest: password_digest,
            coach:           req.body.coach
          })
          .then(user   => res.status(201).json({success: "true"}))
          .catch(error => res.status(400).json({success: "false"}))
}

exports.update = (req, res, next) => {
  console.log('update')
}
