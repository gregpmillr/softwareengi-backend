const express = require('express');
const router = express.Router();
const plans_controller = require('../controllers/plans');

router.use((req,res,next) => {
  console.log('Time: ', Date.now())
  next()
})

router.get('/:username/list', plans_controller.getAll);

router.get('/:id', plans_controller.get);

router.post('/', plans_controller.create);

router.post('/update', plans_controller.update);

module.exports = router;
