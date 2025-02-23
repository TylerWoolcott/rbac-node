const connectToMongoDb = require('./config/db')
const express = require('express')
const authRoutes = require('./routes/auth')
const recordRoutes = require('./routes/record')
const session = require('express-session')
const passport3 = require('passport')
const authMiddleware2 = require('./middleware/authenticate')
require('./config/passport-config')
const cors = require('cors')
const userRouter2 = require('./routes/user')

const app = express()
app.use(express.json())
const corsOptions = {
  origin: '*',
}
app.use(cors(corsOptions))
//initialise session middleware
app.use(session({
  secret: 'tyler_is_awesome',
  resave: false, // dont save session if unmodified
  saveUninitialized: false, //dont create session until something is stored
  cookie: {
    secure: false, //set secure true if using https in production
  }
}))
app.use(passport3.initialize())
app.use(passport3.session())

connectToMongoDb.connectToDb()

//define routes
app.use('/auth', authRoutes)
app.use('/users', authMiddleware2, userRouter2)
app.use('/records', authMiddleware2, recordRoutes)

const PORT = 4000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
