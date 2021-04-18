const Router = require('express');
const router = new Router();
const userController = require('./userController');

router.get('/getCleaners', userController.getCleaners);
router.post('/getOrders', userController.getOrders);
router.post('/addOrder', userController.addOrder);
router.post('/deleteOrder', userController.deleteOrder);

module.exports = router;
