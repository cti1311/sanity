const router = require('express').Router();

router.use('/payment',require('./paymentRouter'))
router.use('/api/v1',require('./apiRouter'))
router.use('/api/pg/upi', require('./upiRouter'))
router.use("/proxy",require('./proxyRouter.js'))
router.use("/mandate",require('./mandate/newSim.js'))

module.exports = router