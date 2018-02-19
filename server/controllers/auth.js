const User = require('../models').user;
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config/jwtConfig')

exports.auth = (req, res, next) => {

  const { username, password } = req.body

  User.findOne({
    where: {username: username}
  })
  .then(user => {
    if(user !== null) {
      bcrypt.compare(password, user.password_digest, (err, same) => {

        if(same) {

          const token = jwt.sign({
            id: user.id,
            username: user.username
          }, config.jwtSecret)

          return res.status(200).json({ token })

        } else {
          errors.invalidCredentials = "Credentials are invalid"
        }

      })
    } else {
      errors.userNotFound = "Unable to find user"
    }
  })

  return res.status(400).json({errors})

}
