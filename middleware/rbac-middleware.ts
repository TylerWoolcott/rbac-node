const UserRoles = require('../models/role')
const UserRolePermissions = require('../models/permissions')

exports.checkPermission = (permission: string) => {
  return (req, res, next) => {
    const userRole = req.user ? req.user.role : 'Anonymous'
    const userPermissions = new RolePermissions().getPermissionsByRoleName(userRole)
    if (userPermissions.includes(permission)) {
      return next()
    }
    else {
      return res.status(403).json({
        error: 'Access denied'
      })
    }
  }
}


//comes into play when the request lifecyle of node js is executed. when request first comes in it goes to middleware, does user have permissions, auth, etc.
//what does middleware return? a function
//what happens if milions of req come simulatamelusly to server that req is being held up, what happens? not using build in methods, so dont need error first architecture
