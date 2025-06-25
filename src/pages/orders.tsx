import React, { useEffect, useState } from "react";
import { apiGetOrders, apiCreateOrder, apiDeleteOrder } from "../api/orders";
import type { Order } from "../types";

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [newOrder, setNewOrder] = useState<Partial<Order>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiGetOrders()
      .then(setOrders)
      .catch((e) => setError(e.message));
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await apiCreateOrder(newOrder as Order);
      setOrders((prev) => [...prev, created]);
      setNewOrder({});
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await apiDeleteOrder(id);
      setOrders((prev) => prev.filter((o) => o.id !== id));
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Orders</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={handleCreate} style={{ marginBottom: 24 }}>
        <input
          type="number"
          placeholder="Customer ID"
          value={newOrder.customerId || ""}
          onChange={(e) =>
            setNewOrder((f) => ({ ...f, customerId: Number(e.target.value) }))
          }
          required
        />
        <input
          type="number"
          placeholder="Product ID"
          value={newOrder.productId || ""}
          onChange={(e) =>
            setNewOrder((f) => ({ ...f, productId: Number(e.target.value) }))
          }
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newOrder.quantity || ""}
          onChange={(e) =>
            setNewOrder((f) => ({ ...f, quantity: Number(e.target.value) }))
          }
          required
        />
        <input
          type="number"
          placeholder="Total Price"
          value={newOrder.totalPrice || ""}
          onChange={(e) =>
            setNewOrder((f) => ({ ...f, totalPrice: Number(e.target.value) }))
          }
          required
        />
        <input
          type="text"
          placeholder="Status"
          value={newOrder.status || ""}
          onChange={(e) =>
            setNewOrder((f) => ({ ...f, status: e.target.value }))
          }
          required
        />
        <input
          type="date"
          placeholder="Order Date"
          value={newOrder.orderDate || ""}
          onChange={(e) =>
            setNewOrder((f) => ({ ...f, orderDate: e.target.value }))
          }
          required
        />
        <button type="submit">Toevoegen</button>
      </form>
      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>ID</th>
            <th>CustomerId</th>
            <th>ProductId</th>
            <th>Quantity</th>
            <th>TotalPrice</th>
            <th>Status</th>
            <th>OrderDate</th>
            <th>Actie</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customerId}</td>
              <td>{order.productId}</td>
              <td>{order.quantity}</td>
              <td>{order.totalPrice}</td>
              <td>{order.status}</td>
              <td>{order.orderDate}</td>
              <td>
                <button onClick={() => handleDelete(order.id)}>
                  Verwijder
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
