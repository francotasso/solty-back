const router = require('express-promise-router')();
const payment = require('../controllers/payment');
const { isAuthenticated } = require('../authentication/auth');

/* GET all products */
router.get('/payments', isAuthenticated, payment.getAllPayments);

/* GET one product*/
router.get('/payment/:paymentId', isAuthenticated, payment.getPayment);

/* POST a new payment */
router.post('/payment', isAuthenticated, payment.newPayment);

/* DELETE one payment */
router.delete('/payment/:paymentId', isAuthenticated, payment.deletePayment);

module.exports = router;