const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    gender: { type: String, required: true },
    category: {type: String, required: true},
    image: { type: String, required: true },
    description: { type: String, required: true },
    details: [{
        id: {type: Number, required: true},
        content: {type: String, required: true}
    }],
    tips: [{
        id: {type: Number, required: true},
        content: {type: String, required: true}
    }]
});

module.exports = mongoose.model('Product', productSchema);