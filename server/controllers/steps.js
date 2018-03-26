const Step = require('../models').steps;
const User = require('../models').users;
const UserPlan = require('../models').user_plans;

exports.create = (req, res, next) => {

  // get the User from username
  // get the UserPlan using the passed in planId and userId that was just fetched
  // create a step and add it to the UserPlan using addStep

   let { steps, username, planId } = req.body

   User.findOne({
     where: {
       username: username
     }
   })
   .then((user) => {
     UserPlan.findOne({
       where: {
         user_id: user.id,
         plan_id: planId
       }
     })
     .then((userPlan) => {
       Step
        .create({
          steps: steps,
          user_plans_id: userPlan.id
        })
        .then((step) => {
          res.status(200).json({status: "ok"})
        })
        .catch((err) => {
          throw err
        })
     })
     .catch((err) => {
       throw err
     })
   })
   .catch((err) => {
     res.status(400).json(err)
   })

}

exports.getStepCountByUserAndPlan = (req, res, next) => {

  // get the User from username
  // get the UserPlan using the passed in planId and userId that was just fetched
  // get the steps from that userPlan

  let { username, plan_id } = req.params

  User.findOne({
    where: {
      username: username
    }
  })
  .then((user) => {
    UserPlan.findOne({
      where: {
        user_id: user.id,
        plan_id: plan_id
      }
    })
    .then((userPlan) => {
      userPlan.getSteps()
      .then((steps) => {
        res.status(200).json( { step_count: Object.keys(steps).length } )
      })
      .catch((err) => {
        throw err
      })
    })
    .catch((err) => {
      throw err
    })
  })
  .catch((err) => {
    res.status(400).json(err)
  })

}

exports.getStepCountByUsername = (req, res, next) => {

  // get the user from the username
  // get all of the UserPlans for this user
  // get all steps for each UserPlans
  // append the steps to a counter

  let { username } = req.params
  let stepCount = 0;

  User.findOne({
    where: {
      username: username
    }
  })
  .then((user) => {
    UserPlan.findAll({
      where: {
        user_id: user.id,
      }
    })
    .then((userPlans) => {
      userPlans.forEach((userPlan) => {
        userPlan.getSteps()
        .then((steps) => {
          stepCount = stepCount + Object.keys(steps).length
        })
        .catch((err) => {
          throw err
        })
      })
    })
    .catch((err) => {
      throw err
    })
  })
  .catch((err) => {
    res.status(400).json(err)
  })

}
