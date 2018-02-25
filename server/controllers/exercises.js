const Exercise = require('../models').exercises;

exports.getAll = (req, res, next) => {

  Exercise.findAll({})
    .then((exercises) => {
      res.status(200).json(exercises)
    })
    .catch((err) => {
      res.status(400).json(err)
    })

}

exports.get = (req, res, next) => {

  let {id} = req.params

  Exercise.findById(req.params.id)
    .then((exercise) => {
      res.status(200).json(exercise)
    })
    .catch((err) => {
      res.status(400).json(err)
    })

}

exports.create = (req, res, next) => {

   let { steps, completed_by_date, plan_id } = req.body

   Exercise
    .create({
      steps             : steps,
      completed_by_date : completed_by_date,
      plan_id           : plan_id,
    })
    .then((exercise) => {
      res.status(200).json(exercise)
    })
    .catch((err) => {
      res.status(400).json({error:"Unable to create exercise"})
    })
}

exports.update = (req, res, next) => {

  let { steps, completed_by_date, id } = req.body

  Exercise.findById(id)
    .then((plan) => {
      return plan.update({
        steps: steps,
        completed_by_date: completed_by_date
      })
      .then((plan) => {
        return plan
      })
      .catch((err) => {
        throw err
      })
    })
    .then((plan) => {
      res.status(200).json(plan)
    })
    .catch((err) => {
      res.status(400).json({error: "Unable to update plan"})
    })

}
