const User   = require('../models').users
const Plan  = require('../models').plans
const Team = require('../models').teams
const Step = require('../models').steps
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config/jwtConfig')
const UserPlan = require('../models').user_plans
const moment = require('moment');
const { Op } = require('sequelize');

exports.getAll = (req, res, next) => {

  User.findAll({})
    .then((users) => {
      res.status(200).json(users)
    })
    .catch((err) => {
      res.status(400).json(err)
    })

}

exports.get = (req, res, next) => {

  let {username} = req.params
  let totalPlans, totalTeams

  User.findOne({
    where: {
      username:username
    },
    include: [ Plan, Team ]
  })
  .then((user) => {
    // here we have access to the users, their plans and user_plans
    totalPlans = Object.keys(user.plans).length
    totalTeams = Object.keys(user.teams).length
  })
  .catch((err) => {
    res.status(400).json(err);
  })
  .then(() => {
        return User.findOne({
                where: {
                        username: username
                }
        })
        .then(user => {
                 return UserPlan.findAll({
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
                              // going to do something odd and just make the user have these new fields
                              let recentPlans = 0
			      let recentSteps = 0
                              for (let userPlan of userPlans) {
                                      recentPlans++;
                                      for(let step of userPlan.Steps) {
                                              recentSteps = recentSteps + step.steps
                                      }
                              }

                              user['recentPlans'] = recentPlans
                              user['recentSteps'] = recentSteps
                              return user
                })
                .catch(err => {
                        throw err
                })
                .then(user => {
                            return UserPlan.findAll({
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
                                                           'steps'
                                                   ]
                                           }
                                   ]
                           })
                           .then(userPlans => {
                                   let totalSteps = 0;

                                   for (let userPlan of userPlans) {
                                           for(let step of userPlan.Steps) {
                                                   totalSteps = totalSteps + step.steps
                                           }
                                   }

                                   user['totalSteps'] = totalSteps
                                   return user;

                           })
                           .catch(err => {
                                   throw err
                           })
                           .then(user => {
                             return user;
                           })
                })
                .catch(err => {
                  throw err
                })
                .then(user => {
                  return user
                })
        })
        .catch(err => {
                throw err
        })
        .then(user => {
          return user;
        })
  })
  .catch(err => {
	   res.status(400).json(err)
  })
  .then((user) => {
    res.status(200).json({
        total_plans: totalPlans,
        total_teams: totalTeams,
        total_steps: user.totalSteps,
        recent_plans: user.recentPlans,
        recent_steps: user.recentSteps
    })
  })

}

exports.create = (req, res, next) => {
  let { username, password, email, coach, language } = req.body
  let password_digest = bcrypt.hashSync(password, 10)

  User
    .create({
      username        :  username,
      email           :  email,
      password_digest :  password_digest,
      coach           :  coach === "true" ? 1 : 0,
      language        :  language
    })
    .then((user) => {
      let token = jwt.sign({
        id: user.id,
        username: user.username,
        email: user.email,
        coach: user.coach
      }, config.jwtSecret)
      res.status(200).json({token: token})
    })
    .catch((err) => {
      console.log(err)
      res.status(400).json({error:"Unable to create user"})
    })

}

exports.update = (req, res, next) => {

  let { username, email, language, coach } = req.body

  User.findOne({
    where: {
      username: username
    }
  })
  .then((user) => {
    return user.update({
      username        :  username,
      email           :  email,
      coach           :  coach,
      language        :  language
    })
    .then((user) => {
      return user
    })
    .catch((err) => {
      throw err
    })
  })
  .then((user) => {
    res.status(200).json(user)
  })
  .catch((err) => {
    console.log(err)
    res.status(400).json({error: "Unable to update user"})
  })

}

exports.update_coach = (req,res,next) => {
  let { coach, id } = req.body

  User.findById(id)
    .then((user) => {
      return user.update({
        coach: coach
      })
      .then((user) => {
        return user
      })
      .catch((err) => {
        throw err
      })
    })
    .then((user) => {
      res.status(200)
    })
    .catch((err) => {
      res.status(400)
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
