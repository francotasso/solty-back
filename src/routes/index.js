const express = require('express');
const router = express.Router();
const base = '/api/v1'

const users = require('./user.js');
const oauth = require('./oauth.js');
const products = require('./product.js');
const payments = require('./payments.js');

router.use(base, users);
router.use(base, oauth);
router.use(base, products);
router.use(base, payments);

module.exports = router;