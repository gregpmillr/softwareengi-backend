const express = require('express');
const router = express.Router();
const exercises_controller = require('../controllers/exercises');

router.use((req,res,next) => {
  console.log('Time: ', Date.now())
  next()
})

router.get('/', exercises_controller.getAll);

router.get('/:id', exercises_controller.get);

router.post('/', exercises_controller.create);

router.post('/update', exercises_controller.update);

module.exports = router;
