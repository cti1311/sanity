const router = require('express').Router();

router.use('/payment',require('./paymentRouter'))
router.use('/api/v1',require('./apiRouter'))
router.use('api/pg/upi', require('./upiRouter'))

module.exports = router