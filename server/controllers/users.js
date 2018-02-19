const User = require('../models').users;

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
  return User
          .create({
            username:        req.body.username,
            email:           req.body.email,
            password_digest: req.body.password_digest,
            coach:           req.body.coach
          })
          .then(test   => res.status(201).send(test))
          .catch(error => res.status(400).send(error));
}

exports.update = (req, res, next) => {
  console.log('update')
}
