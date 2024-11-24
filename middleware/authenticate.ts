const passport2 = require('passport')
const passportJwt = require('passport-jwt')

const JWT_STRATEGY = passportJwt.Strategy
const EXTRACT_JWT = passportJwt.ExtractJwt
const UserModel = require('../models/user')

passport2.use(new JWT_STRATEGY({
  jwtFromRequest: EXTRACT_JWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'tyler_is_awesome',
},
  (jwtPayload, done) => {
    console.log("🚀 ~ jwtPayload:", jwtPayload)
    UserModel.findById(jwtPayload.userId).then(user => {
      if (user) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    }).catch(error => done(error, false))
  }
))

const authenticateJwt = (req, res, next) => {
  passport2.authenticate('jwt', {
    session: false,
  },
    (err, user, info) => {
      console.log("🚀 ~ authenticateJwt ~ info:", info)
      console.log("🚀 ~ authenticateJwt ~ user:", user)
      console.log("🚀 ~ authenticateJwt ~ err:", err)
      if (err) {
        console.error(err)
        return res.status(500).json({ success: false, message: 'Internal server error' })
      }
      if (!user) {
        return res.status(401).json({ success: false, message: 'User is not authorised' })
      }
      req.user = user;
      next()
    }
  )
    (req, res, next)
}

module.exports = authenticateJwt;
