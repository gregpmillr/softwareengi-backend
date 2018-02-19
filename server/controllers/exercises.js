const Exercise = require('../models').exercises;

exports.getAll = (req, res, next) => {
  console.log('get all')
}

exports.get = (req, res, next) => {
  Exercise.findById(req.params.id)
    .then(
      exercise => {
        console.log(exercise);
      }
    )
}

exports.create = (req, res, next) => {
  console.log('create')
  return Exercise
          .create({
            steps:             req.body.steps,
            completed_by_date: req.body.completed_by_date
          })
          .then(test   => res.status(201).send(test))
          .catch(error => res.status(400).send(error));
}

exports.update = (req, res, next) => {
  console.log('update')
}
