import React, { useEffect, useState } from "react";
import {
  apiGetRejectionForms,
  apiCreateRejectionForm,
  apiDeleteRejectionForm,
} from "../api/rejectionForms";
import type { RejectionForm } from "../types";

const emptyRejectionForm: RejectionForm = {
  id: 0,
  purchaseOrderId: 0,
  reason: "",
  rejectionDate: "",
  orderId: 0,
};

const RejectionFormsPage = () => {
  const [forms, setForms] = useState<RejectionForm[]>([]);
  const [newForm, setNewForm] = useState<RejectionForm>({
    ...emptyRejectionForm,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiGetRejectionForms()
      .then(setForms)
      .catch((e) => setError(e.message));
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const created = await apiCreateRejectionForm(newForm);
      setForms((prev) => [...prev, created]);
      setNewForm({ ...emptyRejectionForm });
      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      await apiDeleteRejectionForm(id);
      setForms((prev) => prev.filter((f) => f.id !== id));
      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Rejection Forms</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={handleCreate} style={{ marginBottom: 24 }}>
        <input
          type="number"
          placeholder="Purchase Order ID"
          value={newForm.purchaseOrderId}
          onChange={(e) =>
            setNewForm((f) => ({
              ...f,
              purchaseOrderId: Number(e.target.value),
            }))
          }
          required
        />
        <input
          type="text"
          placeholder="Reason"
          value={newForm.reason}
          onChange={(e) =>
            setNewForm((f) => ({ ...f, reason: e.target.value }))
          }
          required
        />
        <input
          type="date"
          placeholder="Rejection Date"
          value={newForm.rejectionDate}
          onChange={(e) =>
            setNewForm((f) => ({ ...f, rejectionDate: e.target.value }))
          }
          required
        />
        <input
          type="number"
          placeholder="Order ID"
          value={newForm.orderId}
          onChange={(e) =>
            setNewForm((f) => ({ ...f, orderId: Number(e.target.value) }))
          }
          required
        />
        <button type="submit" disabled={loading}>
          Toevoegen
        </button>
      </form>
      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>ID</th>
            <th>PurchaseOrderId</th>
            <th>Reason</th>
            <th>RejectionDate</th>
            <th>OrderId</th>
            <th>Actie</th>
          </tr>
        </thead>
        <tbody>
          {forms.map((form) => (
            <tr key={form.id}>
              <td>{form.id}</td>
              <td>{form.purchaseOrderId}</td>
              <td>{form.reason}</td>
              <td>{form.rejectionDate}</td>
              <td>{form.orderId}</td>
              <td>
                <button
                  onClick={() => handleDelete(form.id)}
                  disabled={loading}
                >
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

export default RejectionFormsPage;
