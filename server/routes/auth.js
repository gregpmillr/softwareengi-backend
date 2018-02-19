const express = require('express')
const router = express.Router()
const auth_controller = require('../controllers/auth')

router.use((req,res,next) => {
  console.log('Time: ', Date.now())
  next()
})

router.post('/', auth_controller.auth)

module.exports = router;
