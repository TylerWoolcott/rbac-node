const express2 = require('express')
const router = express2.Router()
const authController = require('../controllers/auth-controller')

router.post('/login', authController.loginUser)
router.post('/register', authController.registerUser)

module.exports = router
