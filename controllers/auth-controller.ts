const User = require('../models/user')
const Role = require('../models/role')

exports.registerUser = (req, res) => {
  const { userName, password, role } = req.body;
  const user = new User({
    userName,
    role,
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

// error first paradigm/architecture. before doing someting we first check if function throws error, if yes, stop and just return from it. this way we wont have half empty user in db. node lifecycle parameters. .register is mongoose built in function, so we want to have error first architecture
