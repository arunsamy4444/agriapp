const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  buyerId: { type: String, required: true },
  items: [{ product: String, quantity: Number }], // ✅ Only product & quantity, no cart items
  deliveryDate: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["pending", "picked", "in-transit", "delivered"], 
    default: "pending",
    lowercase: true 
  },  address: {
    district: { type: String, required: true },
    taluk: { type: String, required: true },
    pincode: { type: String, required: true },
    specificTown: { type: String, required: true },
  },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Order", OrderSchema);



// const mongoose = require('mongoose');

// const OrderSchema = new mongoose.Schema({
//     buyerId: { type: String, required: true },
//     items: [
//         {
//             product: { type: String, required: true },
//             quantity: { type: Number, required: true }
//         }
//     ],
//     address: { type: String, required: true }, // ✅ Added Address Field
//     deliveryDate: { type: Date, required: true }, // ✅ Added Delivery Date
//     status: { 
//         type: String, 
//         enum: ['Pending', 'Shipped', 'Delivered'], 
//         default: 'Pending' 
//     }
// }, { timestamps: true }); // ✅ Auto-Generate Created & Updated Timestamps

// module.exports = mongoose.model('Order', OrderSchema);
