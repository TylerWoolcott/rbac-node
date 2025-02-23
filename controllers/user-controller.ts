const UserWithRole = require('../models/user')

const getAllUsersWithRole = async (req, res) => {

  try {
    const users = await UserWithRole.find({}, '-password')
    return res.status(200).json({
      success: true,
      count: users.length,
      data: users
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    })
  }
}

module.exports = { getAllUsersWithRole }
