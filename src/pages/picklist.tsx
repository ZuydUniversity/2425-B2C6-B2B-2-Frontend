import React, { useState } from "react";
import { apiCreatePicklist } from "../api/picklists";
import type { Picklist } from "../types";

const emptyPicklist: Picklist = {
  id: 0,
  purchaseOrderId: "",
  type: "",
  components: "",
  orderId: "",
  productId: 0,
  quantity: 0,
};

const PicklistPage = () => {
  const [picklists, setPicklists] = useState<Picklist[]>([]);
  const [newPicklist, setNewPicklist] = useState<Picklist>({
    ...emptyPicklist,
  });
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (field: keyof Picklist, value: string | number) => {
    setNewPicklist((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiCreatePicklist(newPicklist);
      setPicklists((prev) => [...prev, newPicklist]);
      setNewPicklist({ ...emptyPicklist });
      setMessage("Picklist toegevoegd!");
    } catch {
      setMessage("Fout bij toevoegen van picklist.");
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Picklists</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <input
          type="text"
          placeholder="PurchaseOrderId"
          value={newPicklist.purchaseOrderId}
          onChange={(e) => handleChange("purchaseOrderId", e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Type"
          value={newPicklist.type}
          onChange={(e) => handleChange("type", e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Components"
          value={newPicklist.components}
          onChange={(e) => handleChange("components", e.target.value)}
        />
        <input
          type="text"
          placeholder="OrderId"
          value={newPicklist.orderId}
          onChange={(e) => handleChange("orderId", e.target.value)}
        />
        <input
          type="number"
          placeholder="ProductId"
          value={newPicklist.productId}
          onChange={(e) => handleChange("productId", Number(e.target.value))}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newPicklist.quantity}
          onChange={(e) => handleChange("quantity", Number(e.target.value))}
          required
        />
        <button type="submit">Toevoegen</button>
      </form>
      {message && <div>{message}</div>}
      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>PurchaseOrderId</th>
            <th>Type</th>
            <th>Components</th>
            <th>OrderId</th>
            <th>ProductId</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {picklists.map((p, idx) => (
            <tr key={idx}>
              <td>{p.purchaseOrderId}</td>
              <td>{p.type}</td>
              <td>{p.components}</td>
              <td>{p.orderId}</td>
              <td>{p.productId}</td>
              <td>{p.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PicklistPage;
