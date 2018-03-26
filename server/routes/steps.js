const express = require('express');
const router = express.Router();
const steps_controller = require('../controllers/steps');

router.use((req,res,next) => {
  console.log('Time: ', Date.now())
  next()
})

router.get('/:username/:plan_id/list', steps_controller.getStepsByUserAndPlan);

router.post('/', steps_controller.create);

module.exports = router;
