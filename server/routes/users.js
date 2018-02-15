const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user');

router.use((req,res,next) => {
  console.log('Time: ', Date.now())
  next()
})

router.get('/', function(req, res) {
  res.json({ success: true })
})

router.get('/list', function(req,res) {
  res.json({ success: true })
})

router.post('/update', function(req, res) {
  res.json({ success: true })
})

router.post('/', (req, res) => {
  res.json({ success: true })
})

module.exports = router;
