const express = require('express');
const router = express.Router();
const steps_controller = require('../controllers/steps');

router.use((req,res,next) => {
  console.log('Time: ', Date.now())
  next()
})

router.get('/:username/count', steps_controller.getStepCountByUsername)

router.post('/', steps_controller.create);

router.get('/:username/:plan_id/list', steps_controller.getStepsByUserAndPlan);

module.exports = router;
