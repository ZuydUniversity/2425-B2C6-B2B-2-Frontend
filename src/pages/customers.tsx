import React, { useEffect, useState } from "react";
import {
  apiGetCustomers,
  apiCreateCustomer,
  apiDeleteCustomer,
} from "../api/customers";
import type { Customer } from "../types";

const CustomersPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [newCustomer, setNewCustomer] = useState<Partial<Customer>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiGetCustomers()
      .then(setCustomers)
      .catch((e) => setError(e.message));
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await apiCreateCustomer(newCustomer as Customer);
      setCustomers((prev) => [...prev, created]);
      setNewCustomer({});
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await apiDeleteCustomer(id);
      setCustomers((prev) => prev.filter((c) => c.id !== id));
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Customers</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={handleCreate} style={{ marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Username"
          value={newCustomer.username || ""}
          onChange={(e) =>
            setNewCustomer((f) => ({ ...f, username: e.target.value }))
          }
          required
        />
        <input
          type="text"
          placeholder="Name"
          value={newCustomer.name || ""}
          onChange={(e) =>
            setNewCustomer((f) => ({ ...f, name: e.target.value }))
          }
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={newCustomer.password || ""}
          onChange={(e) =>
            setNewCustomer((f) => ({ ...f, password: e.target.value }))
          }
          required
        />
        <button type="submit">Toevoegen</button>
      </form>
      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Name</th>
            <th>Actie</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.username}</td>
              <td>{customer.name}</td>
              <td>
                <button onClick={() => handleDelete(customer.id)}>
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

export default CustomersPage;
