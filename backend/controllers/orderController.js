// backend/controllers/orderController.js
import { getDb } from '../db.js';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createOrder = async (req, res) => {
  const { name, birthdate, aspect, email } = req.body;
  try {
    const db = getDb();
    const result = await db.run(
      `INSERT INTO orders (name, birthdate, aspect, email) VALUES (?, ?, ?, ?)`,
      [name, birthdate, aspect, email]
    );
    res.status(201).json({ message: 'ส่งคำสั่งซื้อสำเร็จ', orderId: result.lastID });
  } catch (err) {
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการบันทึกคำสั่งซื้อ' });
  }
};

export const getOrders = async (req, res) => {
  try {
    const db = getDb();
    const orders = await db.all(`SELECT * FROM orders ORDER BY created_at DESC`);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'ไม่สามารถดึงข้อมูลคำสั่งซื้อได้' });
  }
};

export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const db = getDb();
    await db.run(`UPDATE orders SET status = ? WHERE id = ?`, [status, id]);
    res.json({ message: 'อัปเดตสถานะสำเร็จ' });
  } catch (err) {
    res.status(500).json({ message: 'ไม่สามารถอัปเดตสถานะได้' });
  }
};

export const uploadWallpaper = async (req, res) => {
  const { id } = req.params;
  if (!req.files || !req.files.wallpaper) {
    return res.status(400).json({ message: 'กรุณาแนบไฟล์วอลเปเปอร์' });
  }

  const wallpaper = req.files.wallpaper;
  const fileName = `wallpaper_${id}_${Date.now()}${path.extname(wallpaper.name)}`;
  const uploadPath = path.join(__dirname, '../uploads', fileName);

  try {
    await wallpaper.mv(uploadPath);
    const db = getDb();
    await db.run(`UPDATE orders SET wallpaper_filename = ?, status = 'completed' WHERE id = ?`, [fileName, id]);
    res.json({ message: 'อัปโหลดไฟล์สำเร็จ', fileName });
  } catch (err) {
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการอัปโหลดไฟล์' });
  }
};
