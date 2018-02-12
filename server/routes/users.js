const express = require('express');
const router = express.Router();

router.use((req,res,next) => {
  console.log('Time: ', Date.now())
  next()
})

router.get('/', function(req, res) {
  res.json({ success: true })
})

router.post('/', (req, res) => {
  res.json({ success: true })
})

module.exports = router;
