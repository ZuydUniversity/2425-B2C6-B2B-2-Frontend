import React, { useEffect, useState } from "react";
import {
  apiGetProductionLines,
  apiCreateProductionLine,
  apiDeleteProductionLine,
} from "../api/productionLines";
import type { ProductionLine } from "../types";

const ProductionLinesPage = () => {
  const [lines, setLines] = useState<ProductionLine[]>([]);
  const [newLine, setNewLine] = useState<Partial<ProductionLine>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiGetProductionLines()
      .then(setLines)
      .catch((e: unknown) => {
        if (e instanceof Error) setError(e.message);
        else setError("Unknown error");
      });
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await apiCreateProductionLine(newLine as ProductionLine);
      setLines((prev) => [...prev, created]);
      setNewLine({});
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message);
      else setError("Unknown error");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await apiDeleteProductionLine(id);
      setLines((prev) => prev.filter((l) => l.id !== id));
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message);
      else setError("Unknown error");
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Production Lines</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={handleCreate} style={{ marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Line Name"
          value={newLine.lineName || ""}
          onChange={(e) =>
            setNewLine((f) => ({ ...f, lineName: e.target.value }))
          }
          required
        />
        <label>
          <input
            type="checkbox"
            checked={!!newLine.isActive}
            onChange={(e) =>
              setNewLine((f) => ({ ...f, isActive: e.target.checked }))
            }
          />
          Is Active
        </label>
        <button type="submit">Toevoegen</button>
      </form>
      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Line Name</th>
            <th>Is Active</th>
            <th>Actie</th>
          </tr>
        </thead>
        <tbody>
          {lines.map((line) => (
            <tr key={line.id}>
              <td>{line.id}</td>
              <td>{line.lineName}</td>
              <td>{line.isActive ? "Ja" : "Nee"}</td>
              <td>
                <button onClick={() => handleDelete(line.id)}>Verwijder</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductionLinesPage;
