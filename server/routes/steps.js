const express = require('express');
const router = express.Router();
const steps_controller = require('../controllers/steps');

router.use((req,res,next) => {
  console.log('Time: ', Date.now())
  next()
})

router.get('/', steps_controller.getAll);

router.get('/:id', steps_controller.get);

router.post('/', steps_controller.create);

router.post('/update', steps_controller.update);

module.exports = router;
