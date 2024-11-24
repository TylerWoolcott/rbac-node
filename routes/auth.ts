const express2 = require('express')
const router = express2.Router()
const authController = require('../controllers/auth-controller')

router.post('/register', authController.registerUser)
router.post('/login', authController.loginUser)

module.exports = router
