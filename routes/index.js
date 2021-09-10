const express = require('express');
const router = express.Router();

router.use('/notification', require('./notification'));

module.exports = router;