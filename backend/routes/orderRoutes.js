/// backend/routes/orderRoutes.js
import express from 'express';
import {
  createOrder,
  getOrders,
  updateOrderStatus,
  uploadWallpaper
} from '../controllers/orderController.js';
import { authenticateToken as authenticate } from '../middleware/auth.js';


const router = express.Router();

// สั่งซื้อหน้าเว็บ
router.post('/', createOrder);

// แอดมินต้องล็อกอินก่อนถึงจะใช้ได้
router.get('/', authenticate, getOrders);
router.patch('/:id', authenticate, updateOrderStatus);
router.post('/:id/upload', authenticate, uploadWallpaper);

export default router;
