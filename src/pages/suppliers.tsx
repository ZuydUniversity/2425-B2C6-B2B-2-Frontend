import React, { useEffect, useState } from "react";
import {
  apiGetSuppliers,
  apiCreateSupplier,
  apiDeleteSupplier,
} from "../api/suppliers";
import type { Supplier } from "../types";

const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [newSupplier, setNewSupplier] = useState<Partial<Supplier>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiGetSuppliers()
      .then(setSuppliers)
      .catch((e) => setError(e.message));
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await apiCreateSupplier(newSupplier as Supplier);
      setSuppliers((prev) => [...prev, created]);
      setNewSupplier({});
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await apiDeleteSupplier(id);
      setSuppliers((prev) => prev.filter((s) => s.id !== id));
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Suppliers</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={handleCreate} style={{ marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Name"
          value={newSupplier.name || ""}
          onChange={(e) =>
            setNewSupplier((f) => ({ ...f, name: e.target.value }))
          }
          required
        />
        <button type="submit">Toevoegen</button>
      </form>
      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actie</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.id}>
              <td>{supplier.id}</td>
              <td>{supplier.name}</td>
              <td>
                <button onClick={() => handleDelete(supplier.id)}>
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
