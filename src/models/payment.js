const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
const Product = require('./product');
const timeZone = require('mongoose-timezone');

const paymentSchema = new Schema({
    ownerName: { type: String, required: true },
    cardNumber: { type: String, required: true },
    expirationMonth: { type: Number, required: true },
    expirationYear: { type: Number, required: true },
    securityCode: { type: Number, required: true },
    transactionDate: { type: Date, default: Date.now },
    user: { type: User.schema, required: true },
    product: { type: Product.schema, required: true },
});

paymentSchema.plugin(timeZone, { paths: ['transactionDate'] });
module.exports = mongoose.model('Payment', paymentSchema);