const Product = require('../models/product');

async function getAllProducts(req, res, next) {
    const products = await Product.find({});
    res.status(200).json(products);
}

async function getProductsPagination(req, res, next) {
    const perPage = 5
    const numPage = parseInt(req.params.numPage)
    const skipPage = (numPage - 1) * perPage
    const numProducts = await Product.count()
    let numPages
    if (numProducts % perPage == 0) {
        numPages = parseInt((numProducts / perPage))
    } else {
        numPages = parseInt((numProducts / perPage) + 1)
    }
    const productsPaginate = await Product.find({}).skip(skipPage).limit(perPage).lean();
    let response = {
        products: productsPaginate,
        numPage: numPage,
        numPages: numPages
    }
    res.status(200).json(response)
}

async function getProductsByQuery(req, res, next) {
    const products = await Product.find({ category: req.params.query })
    res.status(200).json(products)
}

async function getProductsByCategory(req, res, next) {
    const products = await Product.find({ category: req.params.category })
    res.status(200).json(products)
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
    getProductsPagination,
    getProductsByQuery,
    getProductsByCategory,
    getProduct,
    newProduct,
    editProduct,
    deleteProduct
}