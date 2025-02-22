const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String
})

userSchema.plugin(passportLocalMongoose)

const Users = mongoose.model('User', userSchema)

module.exports = Users
