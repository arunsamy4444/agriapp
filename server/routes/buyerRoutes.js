const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Order = require('../models/Order');
const authMiddleware = require('../middleware/authMiddleware');

// Fetch All Products (available to everyone)
router.get('/getallproducts', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ products });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Orders Placed (fetch orders placed by a specific user)
router.get('/getorder/:id', authMiddleware, async (req, res) => {
    const { id } = req.params; // Get user ID from route parameter
    try {
        // Fetch orders where the buyer matches the ID in the route
        const orders = await Order.find({ buyer: id })
            .populate('product', 'name picture'); // Populate product details like name and picture
        
        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user.' });
        }

        res.status(200).json({ orders });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Place Order
router.post('/placeorder', authMiddleware, async (req, res) => {
    const { product, quantity, address } = req.body;
    console.log("Request Body:", req.body); // Debugging
    try {
        const order = new Order({
            product,
            quantity,
            address,
            buyer: req.user.id,
            status: 'pending',  // Default status for new orders
        });
        await order.save();
        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Edit Order - Buyer can update status to 'shipped' or 'delivered'
router.put('/editorder/:orderId', authMiddleware, async (req, res) => {
    const { orderId } = req.params;
    const { quantity, address, status } = req.body;

    // Validate allowed status values for the buyer
    const allowedStatuses = ['shipped', 'delivered'];
    
    if (status && !allowedStatuses.includes(status)) {
        return res.status(400).json({ message: `Invalid status. Allowed statuses: ${allowedStatuses.join(', ')}` });
    }
    
    try {
        const order = await Order.findOneAndUpdate(
            { _id: orderId, buyer: req.user.id, status: { $in: ['pending', 'shipped'] } },
            { quantity, address, status },
            { new: true }
        );
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found or not authorized, or status cannot be updated.' });
        }
        
        res.status(200).json({ message: 'Order updated successfully', order });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete Order
router.delete('/deleteorder/:orderId', authMiddleware, async (req, res) => {
    const { orderId } = req.params;
    
    try {
        const order = await Order.findOneAndDelete({ _id: orderId, buyer: req.user.id });
        if (!order) {
            return res.status(404).json({ message: 'Order not found or not authorized' });
        }
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
