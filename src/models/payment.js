const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timeZone = require('mongoose-timezone');

const paymentSchema = new Schema({
    ownerName: { type: String, required: true },
    cardNumber: { type: String, required: true },
    expirationMonth: { type: Number, required: true },
    expirationYear: { type: Number, required: true },
    securityCode: { type: Number, required: true },
    transactionDate: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    products: [{ 
        id: {type: mongoose.Schema.Types.ObjectId, required: true},
        size: {type: String, required: true},
        color: {type: String, required: true},
        quantity: {type: Number, required: true}
    }],
    totalPrice: {type: Number, required: true}
});

paymentSchema.plugin(timeZone, { paths: ['transactionDate'] });
module.exports = mongoose.model('Payment', paymentSchema);