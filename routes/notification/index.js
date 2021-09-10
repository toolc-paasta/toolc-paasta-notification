const express = require('express');
const router = express.Router();
const notificationController = require('../../controller/notificationController');

router.post('/send', notificationController.sendMessage);

module.exports = router;