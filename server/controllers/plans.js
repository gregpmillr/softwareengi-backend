const Plan = require('../models').plans;
const UserPlan = require('../models').user_plans;
let isEmpty = require('lodash.isempty');

exports.getAll = (req, res, next) => {

  let { username } = req.params

  User.findOne({
    where: {
      username: username
    }
  })
  .then((user) => {
    user.getPlans()
      .then((plans) => {
        console.log(plans);
        res.status(200).json(plans)
      })
      .catch((err) => {
        throw err
      })
  })
  .catch((err) => {
    res.status(400).json(err)
  })
}

exports.delete = (req,res,next) => {

  let { planTitle } = req.body

  Plan.findOne({
    where: {
      title: planTitle
    },
    attributes: ['id','title']
  })
  .then((plan) => {
    return UserPlan.findOne({
      where: {
        plan_id : plan.id
      }
    })
    .then((userPlan) => {
      return userPlan.destroy()
    })
    .catch((err) => {
      throw err
    })
  })
  .catch((err) => {
    console.log(err)
    return res.status(400)
  })
  .then(() => {
    return res.status(200)
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
        plan.addUsers([user])
        res.status(200).json(plan)
      }).catch((err) => {
        throw err
      })
    })
    .catch((err) => {
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
