const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment"); // ✅ Import Payment Model

router.post("/pay", async (req, res) => {
    try {
        const { userId, orderId, amount, paymentMode } = req.body;

        if (!userId || !orderId || !amount || !paymentMode) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // ✅ Save Dummy Payment
        const newPayment = new Payment({ userId, orderId, amount, paymentMode });
        await newPayment.save();

        res.json({ message: "Payment recorded successfully", paymentId: newPayment._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

// ✅ GET PAYMENT DETAILS
router.get("/payment/:orderId", async (req, res) => {
    try {
        const { orderId } = req.params;
        const payment = await Payment.findOne({ orderId });

        if (!payment) return res.status(404).json({ error: "Payment not found" });

        res.json(payment);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;