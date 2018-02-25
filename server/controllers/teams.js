const Team = require('../models').teams;

exports.getAll = (req, res, next) => {

  Team.findAll({})
    .then((team) => {
      res.status(200).json(team)
    })
    .catch((err) => {
      res.status(400).json(err)
    })

}

exports.get = (req, res, next) => {

  let {id} = req.params

  Team.findById(id)
    .then((team) => {
      res.status(200).json(team)
    })
    .catch((err) => {
      res.status(400).json(err)
    })

}

exports.create = (req, res, next) => {

  let {name} = req.body

  Team
    .create({
      name: name,
    })
    .then((team) => {
      res.status(200).json(team)
    })
    .catch((err) => {
      res.status(400).json({error:"Unable to create team"})
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
