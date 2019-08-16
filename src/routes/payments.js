const router = require('express-promise-router')();

const payment = require('../controllers/payment');

const { isAuthenticated } = require('../helpers/auth');

/* GET all products */
router.get('/payments', payment.getAllPayments);

/* GET one product*/
router.get('/payment/:paymentId', payment.getPayment);

/* POST a new payment */
router.post('/payment', payment.newPayment);

/* DELETE one payment */
router.delete('/payment/:paymentId', payment.deletePayment);

module.exports = router;