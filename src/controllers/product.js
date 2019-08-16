const Product = require('../models/product');

async function getAllProducts(req, res, next) {
    const products = await Product.find({});
    res.status(200).json(products);
}

async function getProduct(req, res, next) {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    res.status(200).json(product);
}

async function newProduct(req, res, next) {
    const newProduct = new Product(req.body);
    const product = await newProduct.save();
    res.status(200).json(product);
}

async function editProduct(req, res, next) {
    const { productId } = req.params;
    const newProduct = req.body;
    await Product.findByIdAndUpdate(productId, newProduct);
    res.status(200).json({ success: true });
}

async function deleteProduct(req, res, next) {
    const { productId } = req.params;
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ success: true });
}

module.exports = {
    getAllProducts,
    getProduct,
    newProduct,
    editProduct,
    deleteProduct
}