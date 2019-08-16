const Payment = require('../models/payment');

async function getAllPayments(req, res, next) {
    const payments = await Payment.find({});
    res.status(200).json(payments);
}

async function getPayment(req, res, next) {
    const { paymentId } = req.params;
    const payment = await Payment.findById(paymentId);
    res.status(200).json(payment);
}

async function newPayment(req, res, next) {
    const newPayment = new Payment(req.body);
    const validCard = /^(?:4\d([\- ])?\d{6}\1\d{5}|(?:4\d{3}|5[1-5]\d{2}|6011)([\- ])?\d{4}\2\d{4}\2\d{4})$/.test(newPayment.cardNumber)
    if (newPayment.ownerName.trim().length == 0 || newPayment.cardNumber.trim().length == 0 || newPayment.expirationMonth == null || newPayment.expirationYear == null || newPayment.securityCode == null) {
        res.status(500).json({ text: 'Complete todos los campos' });
    } else if (!validCard) {
        res.status(500).json({ text: 'Ingrese una tarjeta válida' });
    } else {
        const payment = await newPayment.save();
        res.status(200).json({ text: 'Payment successfully' });
    }
}

async function deletePayment(req, res, next) {
    const { paymentId } = req.params;
    await Payment.findByIdAndDelete(paymentId);
    res.status(200).json({ success: true });
}

module.exports = {
    getAllPayments,
    getPayment,
    newPayment,
    deletePayment
}