const Plan = require('../models').plans;
let isEmpty = require('lodash.isempty');

exports.getAll = (req, res, next) => {

  let { username } = req.params

  Plan.findAll({
    where: {
      username: username
    }
  })
    .then((plans) => {
      res.status(200).json(plans)
    })
    .catch((err) => {
      res.status(400).json(err)
    })

}

exports.delete = (req,res,next) => {

  let { title } = req.params

  Plan.destroy({
    where: {
      title: title
    }
  }).then(() => {
    res.status(200)
  }).catch(() => {
    res.status(400)
  })


}

exports.get = (req, res, next) => {

  let { title } = req.params

  Plan.findOne({
    where: {
      title: title
    }
  })
  .then((plan) => {
    res.status(200).json(plan)
  })
  .catch((err) => {
    res.status(400).json(err)
  })

}

exports.create = (req, res, next) => {

  let { title, required_steps, username } = req.body;

  Plan
    .create({
      title          : title,
      required_steps : required_steps,
    })
    .then((plan) => {
      User.findOne({
        where: {
          username: username
        }
      }).then((user) => {
        console.log('user:' + user)
        plan.addUser(user)
        res.status(200).json(plan)
      }).catch((err) => {
        throw err
      })
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
      res.status(400).json({error: "Unable to update plan"})
    })

}
