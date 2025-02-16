const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Fetch from users collection
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const SECRET_KEY = "3j4hio5l8trfjng";

router.get('/buyer-info', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        console.log("Token received:", token);

        if (!token) return res.status(401).json({ error: 'Unauthorized' });

        const decoded = jwt.verify(token, SECRET_KEY);
        console.log("Decoded JWT:", decoded);

        const buyerId = decoded.userId; // This is a user ID, not a buyer ID
        console.log("Extracted Buyer ID:", buyerId);

        if (!mongoose.Types.ObjectId.isValid(buyerId)) {
            return res.status(400).json({ error: 'Invalid Buyer ID format' });
        }

        // Fetch from the users collection
        const buyer = await User.findById(buyerId);
        console.log("Buyer found in DB:", buyer);

        if (!buyer) return res.status(404).json({ error: 'Buyer not found' });

        res.json({ buyerId: buyer._id, name: buyer.name, email: buyer.email });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
