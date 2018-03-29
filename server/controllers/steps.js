const Step = require('../models').steps;
const User = require('../models').users;
const UserPlan = require('../models').user_plans;
const moment = require('moment');
const { Op } = require('sequelize');

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
