const express = require('express');
const router = express.Router();
const users_controller = require('../controllers/users');

router.use((req,res,next) => {
  console.log('Time: ', Date.now())
  next()
})

router.get('/', users_controller.getAll);

router.get('/:username', users_controller.get);

router.get('/:username/recentActivity', users_controller.recentActivity)

router.post('/', users_controller.create);

router.post('/update', users_controller.update);

module.exports = router;
