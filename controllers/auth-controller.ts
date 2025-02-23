const passport = require('passport')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Role = require('../models/role')

const registerUser = (req, res) => {
  const { username, password, role = 'employee' } = req.body;
  const user = new User({
    username,
    role
  })
  User.register(user, password, (err) => {
    if (err) {
      console.log(err)
      return res.status(500).json({
        error: err.message
      })
    }
    res.json({
      message: 'User registered successfully'
    })
  })
}

const loginUser = (req, res) => {
  const { username, password } = req.body
  console.log("🚀 ~ loginUser ~ password:", password)
  console.log("🚀 ~ loginUser ~ username:", username)
  if (!username) {
    res.json({ success: false, message: 'User name not given' })
  }
  if (!password) {
    res.json({ success: false, message: 'Password not given' })
  }

  //first param is strategy, where to store use creds if auth'd, second params is callback func
  try {
    passport.authenticate('local', (err, user, info) => {
      console.log("🚀 ~ passport.authenticate ~ err:", err)
      console.log("🚀 ~ passport.authenticate ~ user:", user)
      if (err) {
        console.error(err)
        return res.json({ success: false, messsage: err })
      } else {
        if (!user) {
          res.json({ success: false, message: 'Username or password is incorrect' })
        } else {
          const token = jwt.sign({ userId: user._id, role: user.role }, 'tyler_is_awesome', { expiresIn: '24h' })
          return res.json({ success: true, message: 'Auth successful', token, user })
        }
      }
    })(req, res)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error, message: error.message })
  }


  //auth user w username and pass from mongodb, if exists in db, if true, create token return that token to user, else give message username or password incorrect

  //for product based company roll your own middleware/auth



}

module.exports = { registerUser, loginUser }

// error first paradigm/architecture. before doing someting we first check if function throws error, if yes, stop and just return from it. this way we wont have half empty user in db. node lifecycle parameters. .register is mongoose built in function, so we want to have error first architecture
