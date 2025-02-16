const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: String,
    profile: String,
    email: String,
    password: String,
    role: String // 'admin' or 'customer'
});
module.exports = mongoose.model('User', UserSchema);