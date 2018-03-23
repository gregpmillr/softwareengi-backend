const Plan = require('../models').plans;
const UserPlan = require('../models').user_plans;
let isEmpty = require('lodash.isempty');

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

exports.update_required_steps = (req,res,next) => {

  let { new_title, new_required_steps, plan_id } = req.body

  Plan.findById(plan_id)
    .then((plan) => {
      return plan.update({
        title: new_title,
        required_steps: new_required_steps
      })
      .then((plan) => {
        return plan
      })
      .catch((err) => {
        throw err
      })
    })
    .then((plan) => {
      res.status(200).json({status: "ok"})
    })
    .catch((err) => {
      res.status(400).json({error: "Unable to update required steps in plan"})
    })

}

exports.delete = (req,res,next) => {

  let { plan_id } = req.body

  Plan.findOne({
    where: {
      id: plan_id
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
    .then(() => {
      return plan.destroy()
    })
    .catch((err) => {
      throw err
    })
  })
  .catch((err) => {
    res.status(400).json(err)
  })
  .then(() => {
    res.status(200).json({status: "ok"})
  })

}
