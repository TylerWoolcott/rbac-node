const express3 = require('express')
const recordRouter = express3.Router()
const rbacMiddleware = require('../middleware/rbac-middleware')
const authMiddleware = require('../middleware/authenticate')
const recordController = require('../controllers/record-controller')

recordRouter.get('/', authMiddleware, rbacMiddleware.checkPermission('read_record'), recordController.getAllRecords)
recordRouter.post('/', authMiddleware, rbacMiddleware.checkPermission('create_record'), recordController.createRecord);
recordRouter.put('/:id', authMiddleware, rbacMiddleware.checkPermission('update_record'), recordController.updateRecord);
recordRouter.delete('/:id', authMiddleware, rbacMiddleware.checkPermission('delete_record'), recordController.deleteRecord);

module.exports = recordRouter
