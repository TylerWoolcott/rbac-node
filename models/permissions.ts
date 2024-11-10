const roles = require('../config/roles.json')

class RolePermissions {
  rolePermissions: []
  constructor() {
    this.rolePermissions = []
  }
  getPermissionsByRoleName(roleName: string) {
    const role = roles.roles.find((role) => role.name === roleName)
    return role ? role.permissions : []
  }
}

module.exports = RolePermissions
