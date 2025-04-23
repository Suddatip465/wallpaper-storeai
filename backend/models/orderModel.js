// backend/models/orderModel.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: String, required: true, default: 'pending' },
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
