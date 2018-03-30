const Team = require('../models').teams;
const User = require('../models').users;
const { Op } = require('sequelize');

exports.create = (req, res, next) => {

  let {name, selectedUsers, coach} = req.body
  console.log("NAME: " + name)
  console.log("SELECTED USERS: " + selectedUsers)
  console.log("COACH: " + coach)
  User.findOne({
	where: {
		username: coach
	}
  })
  .then(user => {
	console.log('1')
  	return Team
    	.create({
      		name: name,
      		coach_id: user.id
    	})
    	.then((team) => {
		console.log('2')
        	return  User.findAll({
                	where: 	{
                        		username: {
                                		[Op.or]: JSON.parse(selectedUsers)
                        		}
                		}
        		})
        		.then(users => {
				console.log('3')
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
	console.log(err)
	res.status(400).json(err)
  })
  .then(() => {
	console.log('4')
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
  let { teamName } = req.body

  Team.findOne({
    where: {
      name: teamName
    },
    attributes: ['id','name']
  })
  .then((team) => {
    return UserTeam.findOne({
      where: {
        team_id : team.id
      }
    })
    .then((userTeam) => {
      return userTeam.destroy()
    })
    .catch((err) => {
      throw err
    })
    .then(() => {
      return team.destroy
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
