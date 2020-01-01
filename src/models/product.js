const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    gender: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    discount: {
        percentage: { type: Number, required: true },
        status: { type: Boolean, required: true }
    },
    discountCodes: [{
        code: { type: String, required: true },
        percentage: { type: Number, required: true },
        status: { type: Boolean, required: true }
    }],
    available: {
        sizes: [{
            size: { type: String, required: true },
            colors: [{
                color: { type: String, required: true },
                stock: { type: Number, required: true }
            }]
        }]
    },
    details: [{
        id: { type: Number, required: true },
        content: { type: String, required: true }
    }],
    tips: [{
        id: { type: Number, required: true },
        content: { type: String, required: true }
    }]
});

module.exports = mongoose.model('Product', productSchema);