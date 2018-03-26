const Step = require('../models').steps;
const User = require('../models').users;
const UserPlan = require('../models').user_plans;

exports.getStepsByUserAndPlan = (req, res, next) => {

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
        res.status(200).json(steps)
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
        })
        .then((step) => {
          userPlan.addStep(step)
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
