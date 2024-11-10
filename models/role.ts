const userRoles = require('../config/roles.json')

class UserRole {
  roles: [{ name: string, permissions: string[] }]
  constructor() {
    this.roles = userRoles.roles
  }
  getRoleByName(roleName: string) {
    return this.roles.find((role) => role.name === roleName)
  }
  getRoles() {
    return this.roles
  }
}

module.exports = UserRole;

// single responsiblity principle
