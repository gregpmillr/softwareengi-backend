const Team = require('../models').teams;

exports.getAll = (req, res, next) => {
  console.log('get all')
}

exports.get = (req, res, next) => {
  Team.findById(req.params.id)
    .then(
      team => {
        console.log(team);
      }
    )
}

exports.create = (req, res, next) => {
  console.log('create')
  return Team
          .create({
            name: req.body.name
          })
          .then(test   => res.status(201).send(test))
          .catch(error => res.status(400).send(error));
}

exports.update = (req, res, next) => {
  console.log('update')
}
