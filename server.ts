const connectToMongoDb = require('./config/db')
const express = require('express')
const authRoutes = require('./routes/auth')

const app = express()
app.use(express.json())

connectToMongoDb.connectToDb()

//define routes
app.use('/auth', authRoutes)

const PORT = 4000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
