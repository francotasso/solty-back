const router = require('express-promise-router')();
const product = require('../controllers/product');
const { isAuthenticated } = require('../authentication/auth');

/* GET all products */
router.get('/products', isAuthenticated, product.getAllProducts);

/* GET products by category */
router.get('/products/gender/:gender', isAuthenticated, product.getCategoryGender);

/* GET products by category */
router.get('/products/related/:category', isAuthenticated, product.getProductsByCategory)

/* GET products by query */

router.get('/products/search/:query', isAuthenticated, product.getProductsByQuery)

/* GET products pagination */
router.get('/products/:numPage', isAuthenticated, product.getProductsPagination)

/* GET one product*/
router.get('/product/:productId', isAuthenticated, product.getProduct);

/* POST a new product */
router.post('/product', isAuthenticated, product.newProduct);

/* UPDATE one product */
router.put('/product/:productId', isAuthenticated, product.editProduct);

/* DELETE one product */
router.delete('/product/:productId', isAuthenticated, product.deleteProduct);

module.exports = router;