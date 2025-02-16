const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const Order = require("../models/Order");
const Product = require("../models/Product");

const router = express.Router();
const API_KEY = "5b3ce3597851110001cf624883f55d6c1dd044b5baf673edc602cb80";

// ✅ Fetch all products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Place Order API
router.post("/place-order", async (req, res) => {
  try {
    const { buyerId, items, deliveryDate, address } = req.body;

    if (!buyerId || !items.length || !deliveryDate || !address) {
      return res.status(400).json({ error: "Buyer ID, items, delivery date, and address are required." });
    }

    const newOrder = new Order({
      buyerId,
      items,
      deliveryDate,
      status: "pending",
      address,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get all orders
router.get("/all", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update order status
router.put("/update-status/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = ["pending", "picked", "in-transit", "delivered"];
    if (!validStatuses.includes(status.toLowerCase())) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status: status.toLowerCase() }, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ message: "Order status updated", updatedOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get orders by buyer
router.get("/buyer-orders/:buyerId", async (req, res) => {
  try {
    const { buyerId } = req.params;
    const orders = await Order.find({ buyerId });

    if (orders.length === 0) {
      return res.status(404).json({ error: "No orders found for this buyer" });
    }

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get order details
router.get("/get-order/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Delete order API
router.delete("/delete-order/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ message: "Order deleted successfully", deletedOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const Order = require('../models/Order');
// const Product = require('../models/Product');

// // ✅ Fetch all products (needed for frontend)
// router.get('/products', async (req, res) => {
//     try {
//         const products = await Product.find();
//         res.json(products);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // 📌 Place Order API
// router.post("/place-order", async (req, res) => {
//     try {
//         const { buyerId, items, address, deliveryDate } = req.body;

//         if (!buyerId || !items.length || !address || !deliveryDate) {
//             return res.status(400).json({ error: "All fields are required" });
//         }

//         const newOrder = new Order({
//             buyerId,
//             items,
//             address,
//             deliveryDate,
//             status: "Pending",
//         });

//         await newOrder.save();
//         res.status(201).json({ message: "Order placed successfully!", orderId: newOrder._id });
//     } catch (err) {
//         res.status(500).json({ error: "Server error" });
//     }
// });

// // ✅ Get all orders
// router.get('/all', async (req, res) => {
//     try {
//         const orders = await Order.find();
//         res.json(orders);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // ✅ Update order status
// router.put('/update-status/:orderId', async (req, res) => {
//     try {
//         const { orderId } = req.params;
//         const { status } = req.body;

//         // 🔹 Validate status
//         const validStatuses = ['Pending', 'Shipped', 'Delivered'];
//         if (!validStatuses.includes(status)) {
//             return res.status(400).json({ error: 'Invalid status value' });
//         }

//         // 🔹 Update order status
//         const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

//         if (!updatedOrder) {
//             return res.status(404).json({ error: 'Order not found' });
//         }

//         res.json({ message: 'Order status updated', updatedOrder });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // ✅ Get orders by buyer
// router.get('/buyer-orders/:buyerId', async (req, res) => {
//     try {
//         const { buyerId } = req.params;
//         const orders = await Order.find({ buyerId });

//         if (orders.length === 0) {
//             return res.status(404).json({ error: 'No orders found for this buyer' });
//         }

//         res.json(orders);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// module.exports = router;
