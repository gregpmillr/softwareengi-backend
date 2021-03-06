const Step = require('../models').steps;
const User = require('../models').users;
const UserPlan = require('../models').user_plans;
const moment = require('moment');
const { Op } = require('sequelize');
const Plan = require('../models').plans;

exports.create = (req, res, next) => {

  // get the User from username
  // get the UserPlan using the passed in planId and userId that was just fetched
  // create a step and add it to the UserPlan using addStep

   let { steps, username, planId } = req.body

   Plan.findById(planId)
   .then(plan => {
     return plan;
   })
   .catch(err => {
     throw err
   })
   .then(plan => {
                   User.findOne({
                     where: {
                       username: username
                     }
                   })
                   .then((user) => {
			console.log("finding the first userplan")
                     UserPlan.findOne({
                       where: {
                         user_id: user.id,
                         plan_id: plan.id
                       }
                     })
                     .then((userPlan) => {
			console.log("creating the step")
                       Step
                        .create({
                          steps: steps,
                          user_plans_id: userPlan.id
                        })
                        .then((step) => {
				console.log("step created, returning")
                          return step
                        })
                        .catch((err) => {
                          throw err
                        })
                     })
                     .catch((err) => {
                       throw err
                     })
                    .then(step => {
			console.log("got returned step, checking to see if plan is completed")
                      // check to see if the plan is completed
                      UserPlan.findAll({
                        where: {
                          plan_id: plan.id
                        }
                      })
                      .then(userPlans => {
			console.log("got all user plans")
                        let stepCount = 0;
                        let i = 0;
                        for(let userPlan of userPlans) {
                            // iterate through each step in each userPlan
                            userPlan.getSteps()
                            .then((steps) => {
				console.log("got all steps for this user plan")
                                steps.forEach((step) => {
                                  stepCount = stepCount + step.steps
                                })
                                return stepCount
                            })
                            .then((stepCount) => {
                                i++;
                                // if we've iterated through each plan, return the step counter
                                if(i === userPlans.length) {
					console.log("FINISHED!")
				console.log("PLAN REQUIRED STEPS: " + plan.required_steps)
				console.log("STEP COUNT: " + stepCount)
                                  res.status(200).json({completed: plan.required_steps <= stepCount})
                                }
                            })
                        }
                      })
                    })
                   })
                   .catch((err) => {
                     throw err
                   })
   })
   .catch(err => {
	console.log(err)
     res.status(400).json(err)
   })



}

exports.getStepCountByUsername = (req, res, next) => {

  // get the user from the username
  // get all of the UserPlans for this user
  // get all steps for each UserPlans
  // append the steps to a counter

  let { username } = req.params

  return User.findOne({
    where: {
      username: username
    }
  })
  .then((user) => {
    return UserPlan.findAll({
      where: {
        user_id: user.id,
      }
    })
    .then((userPlans) => {
        return userPlans;
    })
    .catch((err) => {
      throw err
    })
  })
  .catch((err) => {
        let prom = new Promise((resolve, reject) => {

        })

        prom.then((step) => {

        })
    res.status(400).json(err)
  })
  .then((userPlans) => {

	let stepCount = 0;
	let i = 0;

	// iterate through each plan
	for(let userPlan of userPlans) {
	  // iterate through each step in plan
	  userPlan.getSteps()
	  .then((steps) => {
		steps.forEach((step) => {
			stepCount = stepCount + step.steps
		})
		return stepCount
	  })
	  .then((stepCount) => {
		i++;
		// if we've iterated through each plan, return the step counter
		if(i === userPlans.length) {
			res.status(200).json({step_count: stepCount})
		}
	  })
	}

  })

}

exports.recentActivity = (req,res,next) => {

	let {username} = req.params

	User.findOne({
		where: {
			username: username
		}
	})
	.then(user => {
		UserPlan.findAll({
			attributes: {
				exclude: ['completed', 'id', 'created_at', 'updated_at', 'user_id']
			},
			where: {
				user_id: user.id
			},
			include: [
				{
					model: Step,
					as: 'Steps',
					attributes: [
						'steps','updated_at'
					],
					where: {
						updated_at: {
							[Op.gte]: moment().subtract(1, 'days').toDate()
						}
					}
				}
			]
		})
		.then(userPlans => {
			let planCount = 0;
			let stepCount = 0;
			for (let userPlan of userPlans) {
				planCount++;
				for(let step of userPlan.Steps) {
					stepCount = stepCount + step.steps
				}
			}
			res.status(200).json({planCount: planCount, stepCount: stepCount})
		})
		.catch(err => {
			throw err
		})
	})
	.catch(err => {
		res.status(400).json(err)
	})

}

exports.getStepsByUserAndPlan = (req,res,next) => {
        let { username, plan_id } = req.params

        User.findOne({
                where: {
                        username: username
                }
        })
        .then(user => {
                UserPlan.findAll({
                        attributes: {
                                exclude: ['completed', 'id', 'created_at', 'updated_at', 'user_id', 'plan_id']
                        },
                        where: {
                                user_id: user.id,
				plan_id: plan_id
                        },
                        include: [
                                {
                                        model: Step,
                                        as: 'Steps',
                                        attributes: [
                                                'steps','updated_at'
                                        ]
                                }
                        ]
                })
                .then(userPlans => {
                        let steps = [];
                        for (let userPlan of userPlans) {
                                for(let step of userPlan.Steps) {
                                        steps.push(step)
                                }
                        }
                        res.status(200).json(steps)
                })
                .catch(err => {
                        throw err
                })
        })
        .catch(err => {
                res.status(400).json(err)
        })

}
