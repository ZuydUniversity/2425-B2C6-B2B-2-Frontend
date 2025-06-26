import type { Customer } from "../types";

export async function apiGetCustomers() {
  const res = await fetch("/api/Customers");
  if (!res.ok) throw new Error("Failed to fetch customers");
  return res.json();
}

export async function apiCreateCustomer(customer: Customer) {
  const res = await fetch("/api/Customers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
  });
  if (!res.ok) throw new Error("Failed to create customer");
  return res.json();
}

export async function apiGetCustomer(id: number) {
  const res = await fetch(`/api/Customers/${id}`);
  if (!res.ok) throw new Error("Failed to fetch customer");
  return res.json();
}

export async function apiUpdateCustomer(
  id: number,
  customer: Partial<Customer>,
) {
  const res = await fetch(`/api/Customers/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
  });
  if (!res.ok) throw new Error("Failed to update customer");
  return res.json();
}

export async function apiDeleteCustomer(id: number) {
  const res = await fetch(`/api/Customers/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete customer");
  return res.json();
}
