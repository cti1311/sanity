const router = require('express').Router();

router.use('/payment',require('./paymentRouter'))

module.exports = router