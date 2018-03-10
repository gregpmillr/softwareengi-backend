const Step = require('../models').step;

exports.getAll = (req, res, next) => {

  Step.findAll({})
    .then((steps) => {
      res.status(200).json(steps)
    })
    .catch((err) => {
      res.status(400).json(err)
    })

}

exports.get = (req, res, next) => {

  let {id} = req.params

  Step.findById(req.params.id)
    .then((step) => {
      res.status(200).json(step)
    })
    .catch((err) => {
      res.status(400).json(err)
    })

}

exports.create = (req, res, next) => {

   let { steps, plan_id } = req.body

   Step
    .create({
      steps   : steps,
      plan_id : plan_id,
    })
    .then((step) => {
      res.status(200).json(step)
    })
    .catch((err) => {
      res.status(400).json({error:"Unable to create step"})
    })
}

exports.update = (req, res, next) => {

  let { steps, id } = req.body

  Step.findById(id)
    .then((step) => {
      return step.update({
        steps : steps,
      })
      .then((step) => {
        return step
      })
      .catch((err) => {
        throw err
      })
    })
    .then((step) => {
      res.status(200).json(step)
    })
    .catch((err) => {
      res.status(400).json({error: "Unable to update step"})
    })

}
