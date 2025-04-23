// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { getOrders, createOrder, deleteOrder, updateOrder } from '../utils/api'; // import ฟังก์ชัน API
import OrderList from '../components/OrderList'; // import component ที่แสดงรายการคำสั่งซื้อ

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // โหลดคำสั่งซื้อเมื่อเริ่มต้น
  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getOrders(); // ดึงข้อมูลคำสั่งซื้อ
      setOrders(data);
    } catch (error) {
      setError('ไม่สามารถโหลดคำสั่งซื้อได้');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateOrder = async (newOrder) => {
    try {
      const createdOrder = await createOrder(newOrder);
      setOrders([...orders, createdOrder]);
    } catch (error) {
      setError('ไม่สามารถสร้างคำสั่งซื้อได้');
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      await deleteOrder(id);
      setOrders(orders.filter((order) => order.id !== id));
    } catch (error) {
      setError('ไม่สามารถลบคำสั่งซื้อได้');
    }
  };

  const handleUpdateOrder = async (id, updatedOrder) => {
    try {
      const updated = await updateOrder(id, updatedOrder);
      setOrders(orders.map(order => (order.id === id ? updated : order)));
    } catch (error) {
      setError('ไม่สามารถอัปเดตคำสั่งซื้อได้');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Orders Dashboard</h1>

      {/* แสดง error หากเกิดปัญหา */}
      {error && <div className="mb-4 text-red-500">{error}</div>}

      {/* ปุ่มสร้างคำสั่งซื้อ */}
      <button
        onClick={() => handleCreateOrder({ title: 'New Order', status: 'pending', customerName: 'John Doe', total: 100 })}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Create New Order
      </button>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <OrderList
          orders={orders}
          onDelete={handleDeleteOrder}
          onUpdate={handleUpdateOrder}
        />
      )}
    </div>
  );
};

export default Dashboard;
