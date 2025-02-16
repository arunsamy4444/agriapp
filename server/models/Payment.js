const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    orderId: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentMode: { type: String, required: true, enum: ["UPI", "Card", "NetBanking", "Cash"] },
    status: { type: String, default: "Pending" }, // Dummy status
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Payment", PaymentSchema);
