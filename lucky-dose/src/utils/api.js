// src/utils/api.js
import axios from 'axios';

// ตั้งค่า base URL
const apiClient = axios.create({
  baseURL: 'http://localhost:5002/api', // ปรับให้ตรงกับ backend ของคุณ
  headers: {
    'Content-Type': 'application/json',
  },
});

// ฟังก์ชันดึงข้อมูลคำสั่งซื้อ
export const getOrders = async () => {
  const token = localStorage.getItem('token');
  const response = await apiClient.get('/orders', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// ฟังก์ชันสร้างคำสั่งซื้อ
export const createOrder = async (newOrder) => {
  const token = localStorage.getItem('token');
  const response = await apiClient.post('/orders', newOrder, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// ฟังก์ชันลบคำสั่งซื้อ
export const deleteOrder = async (id) => {
  const token = localStorage.getItem('token');
  const response = await apiClient.delete(`/orders/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// ฟังก์ชันอัปเดตคำสั่งซื้อ
export const updateOrder = async (id, updates) => {
  const token = localStorage.getItem('token');
  const response = await apiClient.put(`/orders/${id}`, updates, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
