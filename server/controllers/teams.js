const Team = require('../models').teams;
const UserTeam = require('../models').user_teams;
const User = require('../models').users;
const Plan = require('../models').plans;
const { Op } = require('sequelize');

exports.create = (req, res, next) => {

  let {name, selectedUsers, coach} = req.body

  User.findOne({
	where: {
		username: coach
	}
  })
  .then(user => {
  	return Team
    	.create({
      		name: name,
      		coach_id: user.id
    	})
    	.then((team) => {
        	return  User.findAll({
                	where: 	{
                        		username: {
                                		[Op.or]: JSON.parse(selectedUsers)
                        		}
                		}
        		})
        		.then(users => {
               			team.addUsers(users)
        		})
        		.catch(err => {
                		throw err
       	 		})
   	 })
   	 .catch(err => {
     	 	throw err
	 })

  })
  .catch(err => {
	res.status(400).json(err)
  })
  .then(() = > {
	res.status(200).json({"status":"OK"})
  })

}

exports.getAll = (req,res,next) => {
	Team.findAll({})
	.then(teams => {
		res.status(200).json(teams)
	})
	.catch(err => {
		res.status(400).json(err)
	})
}

exports.getAllByUsername = (req, res, next) => {

  let { username } = req.params

  // find coach
  User.findOne({
    where: {
      username: username
    }
  })
  .then((user) => {
    user.getTeams()
      .then((teams) => {
        res.status(200).json(teams)
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

  let { name } = req.params

  Team.findOne({
    where: {
      name: name
    }
  })
  .then((team) => {
    res.status(200).json(team)
  })
  .catch((err) => {
    res.status(400).json(err)
  })

}

exports.update = (req, res, next) => {

  let { name, id } = req.body

  Team.findById(id)
    .then((team) => {
      return team.update({
        name: name
      })
      .then((team) => {
        return team
      })
      .catch((err) => {
        throw err
      })
    })
    .then((team) => {
      res.status(200).json(team)
    })
    .catch((err) => {
      res.status(400).json({error: "Unable to update team"})
    })

}

exports.delete = (req,res,next) => {
	let { teamId } = req.body

	Team.findById(teamId)
	.then(team => {
		console.log("DESTROYIN USER TEAMS")
		UserTeam.destroy({
			where: {
				team_id: team.id
			}
		})
		.then(() => {
			console.log("DESTROYING TEAM")
			team.destroy()
			.then(() => {
				res.status(200).json({status:"OK"})
			})
		})
	})
	.catch(err => {
		res.status(400).json(err)
	})


}

exports.getMembers = (req,res,next) => {

	let { id } = req.params

	Team.findById(id)
	.then(team => {
		team.getUsers()
		.then(users => {
			res.status(200).json(users)
		})
		.catch(err => {
			throw err
		})
	})
	.catch(err => {
		console.log(err)
		res.status(400).json(err)
	})

}

exports.join = (req,res,next) => {

	let { username, teamId } = req.body

	User.findOne({
		where: {
			username: username
		}
	})
	.then(user => {
		// get the team to add this user to
		return Team.findById(teamId)
		.then(team => {
			team.addUsers([user]);
			res.status(200).json({status:"OK"})
		})
		.catch(err => {
			throw err
		})
	})
	.catch(err => {
		res.status(400).json(err)
	})

}

exports.massAssign = (req,res,next) => {

	let { teamId, planId } = req.body
	console.log("TEAMID: " + teamId)
	console.log("PLANID: " + planId)
	Team.findById(teamId)
	.then(team => {
		return team.getUsers()
		.then(users => {
			Plan.findById(planId)
			.then(plan => {
				plan.addUsers(users)
				res.status(200).json({status:"OK"})
			})
			.catch(err => {
				throw err
			})
		})
		.catch(err => {
			throw err
		})
	})
	.catch(err => {
		res.status(400).json(err)
	})

}
