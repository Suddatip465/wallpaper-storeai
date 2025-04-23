import express from 'express';
import { authenticateToken as authenticate } from '../middleware/auth.js';
import { login } from '../controllers/authController.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { getDb } from '../db.js';


const router = express.Router();
// ✅ GET /orders - admin เท่านั้น
router.get('/', authenticate, async (req, res) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
  
    try {
      const db = getDb();
      const orders = await db.all(`SELECT * FROM orders`);
      res.json(orders);
    } catch (err) {
      console.error('Get orders error:', err);
      res.status(500).json({ message: 'เกิดข้อผิดพลาด', detail: err.message });
    }
  });
  
  // ✅ PATCH /orders/:id - แก้สถานะ
  router.patch('/:id', authenticate, async (req, res) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
  
    const { status } = req.body;
    const { id } = req.params;
  
    try {
      const db = getDb();
      await db.run(`UPDATE orders SET status = ? WHERE id = ?`, [status, id]);
      res.json({ message: 'อัปเดตสถานะเรียบร้อย' });
    } catch (err) {
      console.error('Update order status error:', err);
      res.status(500).json({ message: 'เกิดข้อผิดพลาด', detail: err.message });
    }
  });
  
router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const db = getDb();
  
      const user = await db.get(`SELECT * FROM users WHERE username = ?`, [username]);
  
      if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
  
      const token = jwt.sign({ id: user.id, role: user.role }, 'your-secret-key', {
        expiresIn: '1d',
      });
  
      res.json({ token });
  
    } catch (err) {
      console.error('Login error:', err); // 👈 log ออกมาดูใน console
      res.status(500).json({ message: 'เกิดข้อผิดพลาดในระบบ', detail: err.message });
    }
  });  
  
  
  export default router;