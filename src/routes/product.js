const router = require('express-promise-router')();

const product = require('../controllers/product');

const { isAuthenticated } = require('../helpers/auth');

/* GET all products */
router.get('/products', isAuthenticated, product.getAllProducts);

/* GET one product*/
router.get('/product/:productId', isAuthenticated, product.getProduct);

/* POST a new product */
router.post('/product', isAuthenticated, product.newProduct);

/* UPDATE one product */
router.put('/product/:productId', isAuthenticated, product.editProduct);

/* DELETE one product */
router.delete('/product/:productId', isAuthenticated, product.deleteProduct);

module.exports = router;