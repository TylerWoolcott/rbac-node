const express4 = require('express')
const userRouter = express4.Router()
const userController = require('../controllers/user-controller')

userRouter.get('/get-all-users-with-role', userController.getAllUsersWithRole)

module.exports = userRouter
