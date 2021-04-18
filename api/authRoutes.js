const Router = require('express');
const router = new Router();
const authController = require('./authController');

router.post('/registration', authController.registration);
router.post('/login', authController.login);
router.post('/reset', authController.reset);

module.exports = router;
