const Plan = require('../models').plans;

exports.getAll = (req, res, next) => {
  console.log('get all')
}

exports.get = (req, res, next) => {
  Plan.findById(req.params.id)
    .then(
      plan => {
        console.log(plan);
      }
    )
}

exports.create = (req, res, next) => {
  return Plan
          .create({
            title:      req.body.title,
            difficulty: req.body.difficulty,
            completed:  req.body.completed,
          })
          .then(test   => res.status(201).send(test))
          .catch(error => res.status(400).send(error));
}

exports.update = (req, res, next) => {
  console.log('update')
}
