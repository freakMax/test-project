const Router = require('express');
const router = new Router();
const adminController = require('./adminController');

router.get('/getOrders', adminController.getOrders);
router.get('/getUsers', adminController.getUsers);
router.post('/addCleaner', adminController.addCleaner);
router.post('/havePermission', adminController.havePermission);
router.put('/updateCleaner', adminController.updateCleaner);
router.post('/deleteCleaner', adminController.deleteCleaner);
router.put('/updateStatus', adminController.updateStatus);

module.exports = router;
