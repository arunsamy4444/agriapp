const express = require('express');
const router = express.Router();
const multer = require('multer');
const Product = require('../models/Product');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const SECRET_KEY = '3j4hio5l8trfjng';

// ⚡ Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });


// ✅ Secure Token Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization; // Get token from header
  if (!token) return res.status(401).json({ error: 'Access denied' });

  const tokenParts = token.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(403).json({ error: "Invalid token format" });
  }

  jwt.verify(tokenParts[1], SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    
    req.user = decoded;  // Store user data in request
    next();
  });
};


// ✅ ADD PRODUCT (Admin Only)
router.post("/add", verifyToken, upload.single("image"), async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).exec();
        if (!user || user.role !== "admin") {
            return res.status(403).json({ error: "Access Denied: Admins only" });
        }

        const { name, price, description, quantity } = req.body;

        const newProduct = new Product({
            name,
            price,
            description,
            quantity,
            image: req.file ? req.file.filename : null, // Save image filename
        });

        await newProduct.save();
        res.json({ message: "Product added successfully", product: newProduct });
    } catch (err) {
        console.error("Error adding product:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ GET ALL PRODUCTS
router.get('/all', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ EDIT PRODUCT (Admin Only)
router.put('/edit/:productId', verifyToken, upload.single('image'), async (req, res) => {
    try {
        const { productId } = req.params;
        const { name, price, description, quantity } = req.body;
        
        let product = await Product.findById(productId);
        if (!product) return res.status(404).json({ error: 'Product not found' });

        const user = await User.findById(req.user.userId);
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ error: 'Access Denied' });
        }

        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;
        product.quantity = quantity || product.quantity;
        if (req.file) product.image = req.file.filename;

        await product.save();
        res.json({ message: 'Product updated', product });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ DELETE PRODUCT (Admin Only)
router.delete('/delete/:productId', verifyToken, async (req, res) => {
    try {
        const { productId } = req.params;

        const user = await User.findById(req.user.userId);
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ error: 'Access Denied' });
        }

        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) return res.status(404).json({ error: 'Product not found' });

        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
