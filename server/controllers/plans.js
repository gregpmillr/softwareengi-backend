const Plan = require('../models').plans;
let isEmpty = require('lodash.isempty');

exports.getAll = (req, res, next) => {

  Plan.findAll({})
    .then((plans) => {
      res.status(200).json({plans})
    })
    .catch((err) => {
      res.status(400).json(err)
    })

}

exports.get = (req, res, next) => {

  let {id} = req.params

  Plan.findById(id)
    .then((plan) => {
      res.status(200).json(plan)
    })
    .catch((err) => {
      res.status(400).json(err)
    })

}

exports.create = (req, res, next) => {

  let { title, required_steps } = req.body;

  Plan
    .create({
      title          : title,
      required_steps : required_steps,
    })
    .then((plan) => {
      res.status(200).json(plan)
    })
    .catch((err) => {
      console.log(err)
      res.status(400).json({error:"Unable to create plan"})
    })

}

exports.update = (req, res, next) => {

  let { title, required_steps, id } = req.body

  Plan.findById(id)
    .then((plan) => {
      return plan.update({
        title: title,
        required_steps: required_steps
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
      console.log(err)
      res.status(400).json({error: "Unable to update plan"})
    })

}
