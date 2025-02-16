const mongoose = require('mongoose');

const BuyerSchema = new mongoose.Schema({
    name: String,
    email: String,
    buyerId: String // Unique identifier for the buyer
});

module.exports = mongoose.model('Buyer', BuyerSchema);
