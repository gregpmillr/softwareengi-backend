const User = require('../models').users
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config/jwtConfig')

exports.auth = (req, res, next) => {

  let { username, password } = req.body

  User.findOne({
    where: {username: username}
  })
  .then((user) => {
      return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password_digest, (err, same) => {
          if(same) {
            let token = jwt.sign({
              id: user.id,
              username: user.username
            }, config.jwtSecret)
            resolve({token: token})
          } else {
            reject(err)
          }
        })
      })
  })
  .then((token) => {
    res.status(200).json(token)
  })
  .catch((err) => {
    res.status(400).json({error: "Invalid credentials"})
  })

}
