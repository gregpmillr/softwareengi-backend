const Plan = require('../models').plans;
const User = require('../models').users;
const UserPlan = require('../models').user_plans;
const Step = require('../models').steps;

let isEmpty = require('lodash.isempty');

exports.create = (req, res, next) => {

  let { title, required_steps, username } = req.body;
  let coachId = null;
  console.log('HERES THE COACH ID: ' + req.body.coachId);
  if (typeof req.body.coachId !== 'undefined' && req.body.coachId) {
	coachId = req.body.coachId
  }

  Plan
    .create({
      title          : title,
      coach_id       : coachId,
      required_steps : required_steps
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

exports.update = (req,res,next) => {

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

	UserPlan.findAll({
		where: {
			plan_id: plan_id
		}
	})
	.then(userPlans => {
		console.log("Deleting steps for userPlans")
		let i = 0;
		for(let userPlan of userPlans) {
			i++;
			Step.destroy({
				where: { user_plans_id: userPlan.id }
			})

			if(i === userPlans.length) {
				console.log("destroying all userPlans")
				UserPlan.destroy({
					where: { plan_id: userPlan.plan_id}
				})
				.then(() => {
					console.log("DELETING PLAN!!!!")
					Plan.destroy({
						where: {id:userPlan.plan_id}
					})
					.then(() => {
						res.status(200).json({stats: "OK"})
					})
				})
			}
		}
	})
	.catch(err => {
		res.status(400).json(err)
	})

}

exports.getUserProgress = (req,res,next) => {

	let { planId } = req.params

	// get the contributed steps for each user on this plan
	UserPlan.findAll({
		where: {
			plan_id: planId
		}
	})
	.then(userPlans => {
		let i = 0;
		let users = [];
		for(let userPlan of userPlans) {
			// get user for this user_plan
			User.findById(userPlan.user_id)
			.then(user => {
				return user
			})
			.catch(err => {
				throw err
			})
			.then((user) => {
	                        // iterate through each step in user_plan
				let stepCount = 0;
				return Step.findAll({
					where: {
						user_plans_id: userPlan.id
					}
				})
				.then(steps => {
					for(let step of steps) {
						stepCount = stepCount + step.steps
					}
					return {stepCount: stepCount, user: user}
				})
				.catch(err => {
					throw err;
				})
			})
			.then((obj) => {
				obj.user['stepCount'] = obj.stepCount
				return obj.user;
			})
			.then(user => {
				let newUser = {
					username: user.username,
					stepsContributed: user.stepCount
				}
				users.push(newUser)
				i++
                                // if we've iterated through each plan, return the step counter
                                if(i === userPlans.length) {
                                        res.status(200).json(users)
                                }
			})
		}
	})
	.catch(err => {
		res.status(400).json(err)
	})
}


