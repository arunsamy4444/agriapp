const express = require('express');
const router = express.Router();
const User = require('../models/User');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const jwt = require("jsonwebtoken"); 
const SECRET_KEY = "3j4hio5l8trfjng"; 

const otpStorage = {}; // Temporary storage for OTPs

// ✅ Secure Email Transporter (Direct Credentials)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'arunsamy4444@gmail.com',    // Direct Email
        pass: 'swaf bwnb gigv dljc'        // Direct Password
    }
});

// ✅ Configure Multer (For Profile Image Uploads)
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });


// ✅ FETCH ALL USERS (Admin Route)
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// ✅ SIGNUP (Register Without Hashing)
router.post('/signup', upload.single('profile'), async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const profile = req.file ? `/uploads/${req.file.filename}` : null;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: 'Email already registered' });

        // Save user without hashing
        const newUser = new User({ name, profile, email, password, role });
        await newUser.save();

        res.json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ LOGIN (JWT Auth Without Hashing)
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT with user ID
    const token = jwt.sign(
        { userId: user._id, role: user.role },  
        SECRET_KEY,  
        { expiresIn: "30d" }
    );

    res.json({ token, userId: user._id, role: user.role });
});

// ✅ FORGOT PASSWORD (Send OTP via Email)
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ error: "User not found" });

        // Generate 6-digit OTP
        const otp = crypto.randomInt(100000, 999999).toString();
        otpStorage[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 }; // OTP expires in 5 mins

        // Send OTP via Email
        const mailOptions = {
            from: 'arunsamy4444@gmail.com',
            to: email,
            subject: 'Your OTP for Password Reset',
            text: `Your OTP is: ${otp}. It is valid for 5 minutes.`
        };

        await transporter.sendMail(mailOptions);
        res.json({ message: "OTP sent to email" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ VERIFY OTP
router.post('/verify-otp', async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!otpStorage[email]) return res.status(400).json({ error: "No OTP found for this email" });

        const { otp: storedOtp, expiresAt } = otpStorage[email];

        if (Date.now() > expiresAt) return res.status(400).json({ error: "OTP expired" });
        if (storedOtp !== otp) return res.status(400).json({ error: "Invalid OTP" });

        res.json({ message: "OTP verified successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ RESET PASSWORD (Update User Password)
router.post('/reset-password', async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });

        user.password = newPassword;  // Update password directly
        await user.save();

        delete otpStorage[email]; // Remove OTP from storage

        res.json({ message: "Password updated successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
