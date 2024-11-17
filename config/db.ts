const mongooseDb = require('mongoose')

const connectToDb = async () => {
  try {
    await mongooseDb.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/rbac')
    console.log('mongooseDb is connected')
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}

module.exports = { connectToDb }
