import React, { useEffect, useState } from "react";
import {
  apiGetApprovalForms,
  apiCreateApprovalForm,
  apiDeleteApprovalForm,
} from "../api/approvalForms";
import type { ApprovalForm } from "../types";

const emptyApprovalForm: ApprovalForm = {
  id: 0,
  purchaseOrderId: 0,
  isApproved: false,
  comments: "",
  orderId: 0,
  dateApproved: "",
};

const ApprovalFormsPage = () => {
  const [forms, setForms] = useState<ApprovalForm[]>([]);
  const [newForm, setNewForm] = useState<ApprovalForm>({
    ...emptyApprovalForm,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiGetApprovalForms()
      .then(setForms)
      .catch((e) => setError(e.message));
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const created = await apiCreateApprovalForm(newForm);
      setForms((prev) => [...prev, created]);
      setNewForm({ ...emptyApprovalForm });
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
      await apiDeleteApprovalForm(id);
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
      <h2>Approval Forms</h2>
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
          placeholder="Comments"
          value={newForm.comments}
          onChange={(e) =>
            setNewForm((f) => ({ ...f, comments: e.target.value }))
          }
        />
        <label>
          <input
            type="checkbox"
            checked={!!newForm.isApproved}
            onChange={(e) =>
              setNewForm((f) => ({ ...f, isApproved: e.target.checked }))
            }
          />
          Approved
        </label>
        <input
          type="number"
          placeholder="Order ID"
          value={newForm.orderId}
          onChange={(e) =>
            setNewForm((f) => ({ ...f, orderId: Number(e.target.value) }))
          }
          required
        />
        <input
          type="date"
          placeholder="Date Approved"
          value={newForm.dateApproved}
          onChange={(e) =>
            setNewForm((f) => ({ ...f, dateApproved: e.target.value }))
          }
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
            <th>OrderId</th>
            <th>Approved</th>
            <th>Comments</th>
            <th>Date Approved</th>
            <th>Actie</th>
          </tr>
        </thead>
        <tbody>
          {forms.map((form) => (
            <tr key={form.id}>
              <td>{form.id}</td>
              <td>{form.purchaseOrderId}</td>
              <td>{form.orderId}</td>
              <td>{form.isApproved ? "Ja" : "Nee"}</td>
              <td>{form.comments}</td>
              <td>{form.dateApproved}</td>
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

export default ApprovalFormsPage;
