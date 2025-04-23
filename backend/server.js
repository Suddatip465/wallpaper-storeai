// server.js (สำหรับ Express)

const express = require('express');
const cors = require('cors');
const app = express();
const port = 5002;

// ใช้ middleware
app.use(cors());
app.use(express.json());

// สร้างคำสั่งซื้อ (POST)
app.post('/api/orders', (req, res) => {
  const { title, status, customerName, total } = req.body;
  const newOrder = {
    id: Date.now(),
    title,
    status,
    customerName,
    total,
  };
  // เก็บคำสั่งซื้อในฐานข้อมูล (หรือในที่นี้ใช้ in-memory)
  orders.push(newOrder);
  res.json(newOrder);
});

// ดึงข้อมูลคำสั่งซื้อ (GET)
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

// ลบคำสั่งซื้อ (DELETE)
app.delete('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  orders = orders.filter((order) => order.id !== parseInt(id));
  res.status(204).send();
});

// อัปเดตคำสั่งซื้อ (PUT)
app.put('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  const { title, status, customerName, total } = req.body;
  let updatedOrder = orders.find((order) => order.id === parseInt(id));

  if (updatedOrder) {
    updatedOrder = { ...updatedOrder, title, status, customerName, total };
    res.json(updatedOrder);
  } else {
    res.status(404).send('Order not found');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
