const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');
const buyerRoutes = require('./routes/buyer');

// Load environment variables
dotenv.config();

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const paymentRoutes = require('./routes/payment');

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use('/uploads', express.static('uploads')); // Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve images

// ✅ Configure Multer for File Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save files to 'uploads' directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});
const upload = multer({ storage });

// ✅ Connect to MongoDB
mongoose.connect('mongodb+srv://startup:startup@startup.dzqfb.mongodb.net/?retryWrites=true&w=majority&appName=startup', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// ✅ Use Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/api', paymentRoutes);
app.use('/buyer', buyerRoutes);

// ✅ Upload Profile Image Route
app.post('/upload', upload.single('profile'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    res.json({ message: 'File uploaded successfully', filePath: `/uploads/${req.file.filename}` });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
