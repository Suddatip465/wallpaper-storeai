import React, { useState } from "react";

const OrderList = ({ orders, onUpdateOrder, onDeleteOrder }) => {
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [editCustoer, setEditCustomer] = useState('');

  const handleEdit = (order) => {
    setEditId(order.id);
    setEditTitle(order.title);
    setEditStatus(order.status);
    setEditCustomer(order.customerName);
  };

  const handleSave = () => {
    onUpdateOrder(editId, {
      title: editTitle,
      status: editStatus,
      customerName: editCustomer,
    });
    setEditId(null);
  };

  return (
    <ul className="space-y-4">
      {orders.map((order) => (
        <li key={order.id} className="border p-4 rounded-lg shadow-md bg-white">
          {editId === order.id ? (
            <div className="grid gap-3">
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="p-2 border rounded"
                placeholder="Order Title"
              />
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
              <input
                value={editCustomer}
                onChange={(e) => setEditCustomer(e.target.value)}
                className="p-2 border rounded"
                placeholder="Customer Name"
              />
              <input
                type="number"
                value={editTotal}
                onChange={(e) => setEditTotal(parseFloat(e.target.value))}
                className="p-2 border rounded"
/>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleSave}
                  className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                >
                  💾 Save
                </button>
                <button
                  onClick={() => setEditId(null)}
                  className="text-gray-600 px-3 py-1 hover:underline"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{order.title}</h3>
                <p>Status: <span className="font-medium">{order.status}</span></p>
                <p>Customer: {order.customerName}</p>
                <p>Total: ${order.total.toFixed(2)}</p>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleEdit(order)}
                  className="text-yellow-500 hover:underline"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => onDeleteOrder(order.id)}
                  className="text-red-500 hover:underline"
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default OrderList;
