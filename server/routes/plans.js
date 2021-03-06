const express = require('express');
const router = express.Router();
const plans_controller = require('../controllers/plans');

router.use((req,res,next) => {
  console.log('Time: ', Date.now())
  next()
})

router.get('/:username/list', plans_controller.getAll);

router.get('/:title', plans_controller.get);

router.get('/:planId/userProgress', plans_controller.getUserProgress); 

router.post('/', plans_controller.create);

router.post('/update', plans_controller.update);

router.post('/delete', plans_controller.delete);

module.exports = router;
