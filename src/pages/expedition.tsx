import React, { useState } from "react";
import { apiCreateExpedition } from "../api/expedition";
import type { Expedition } from "../types";

const emptyExpedition: Expedition = {
  id: 0,
  shipmentReference: "",
  shipmentDate: "",
  destination: "",
  isDelivered: false,
};

const ExpeditionPage = () => {
  const [expeditions, setExpeditions] = useState<Expedition[]>([]);
  const [newExpedition, setNewExpedition] = useState<Expedition>({
    ...emptyExpedition,
  });
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (field: keyof Expedition, value: string | boolean) => {
    setNewExpedition((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiCreateExpedition(newExpedition);
      setExpeditions((prev) => [...prev, newExpedition]);
      setNewExpedition({ ...emptyExpedition });
      setMessage("Expeditie toegevoegd!");
    } catch {
      setMessage("Fout bij toevoegen van expeditie.");
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Expedities</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Shipment Reference"
          value={newExpedition.shipmentReference}
          onChange={(e) => handleChange("shipmentReference", e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Shipment Date"
          value={newExpedition.shipmentDate}
          onChange={(e) => handleChange("shipmentDate", e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Destination"
          value={newExpedition.destination}
          onChange={(e) => handleChange("destination", e.target.value)}
          required
        />
        <label>
          <input
            type="checkbox"
            checked={newExpedition.isDelivered}
            onChange={(e) => handleChange("isDelivered", e.target.checked)}
          />
          Is Delivered
        </label>
        <button type="submit">Toevoegen</button>
      </form>
      {message && <div>{message}</div>}
      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Shipment Reference</th>
            <th>Shipment Date</th>
            <th>Destination</th>
            <th>Is Delivered</th>
          </tr>
        </thead>
        <tbody>
          {expeditions.map((e, idx) => (
            <tr key={idx}>
              <td>{e.shipmentReference}</td>
              <td>{e.shipmentDate}</td>
              <td>{e.destination}</td>
              <td>{e.isDelivered ? "Ja" : "Nee"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpeditionPage;
