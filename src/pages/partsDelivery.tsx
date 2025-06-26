import React, { useState } from "react";
import { apiCreatePartsDelivery } from "../api/partsDelivery";
import type { PartsDelivery } from "../types";

const emptyPartsDelivery: PartsDelivery = {
  id: 0,
  partsReference: "",
  deliveryDate: "",
  isComplete: false,
};

const PartsDeliveryPage = () => {
  const [deliveries, setDeliveries] = useState<PartsDelivery[]>([]);
  const [newDelivery, setNewDelivery] = useState<PartsDelivery>({
    ...emptyPartsDelivery,
  });
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (
    field: keyof PartsDelivery,
    value: string | boolean,
  ) => {
    setNewDelivery((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiCreatePartsDelivery(newDelivery);
      setDeliveries((prev) => [...prev, newDelivery]);
      setNewDelivery({ ...emptyPartsDelivery });
      setMessage("Parts delivery toegevoegd!");
    } catch {
      setMessage("Fout bij toevoegen van parts delivery.");
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Parts Deliveries</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Parts Reference"
          value={newDelivery.partsReference}
          onChange={(e) => handleChange("partsReference", e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Delivery Date"
          value={newDelivery.deliveryDate}
          onChange={(e) => handleChange("deliveryDate", e.target.value)}
          required
        />
        <label>
          <input
            type="checkbox"
            checked={newDelivery.isComplete}
            onChange={(e) => handleChange("isComplete", e.target.checked)}
          />
          Is Complete
        </label>
        <button type="submit">Toevoegen</button>
      </form>
      {message && <div>{message}</div>}
      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Parts Reference</th>
            <th>Delivery Date</th>
            <th>Is Complete</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((d, idx) => (
            <tr key={idx}>
              <td>{d.partsReference}</td>
              <td>{d.deliveryDate}</td>
              <td>{d.isComplete ? "Ja" : "Nee"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PartsDeliveryPage;
