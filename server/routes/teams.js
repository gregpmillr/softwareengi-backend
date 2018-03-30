const express = require('express');
const router = express.Router();
const teams_controller = require('../controllers/teams');

router.use((req,res,next) => {
  console.log('Time: ', Date.now())
  next()
})

router.get('/', teams_controller.getAll);

router.get('/:username', teams_controller.getAllByUsername);

router.get('/:id', teams_controller.get);

router.post('/', teams_controller.create);

router.post('/update', teams_controller.update);

module.exports = router;
