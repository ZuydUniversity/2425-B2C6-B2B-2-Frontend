import type { Supplier } from "../types";

export async function apiGetSuppliers() {
  const res = await fetch("/api/Suppliers");
  if (!res.ok) throw new Error("Failed to fetch suppliers");
  return res.json();
}

export async function apiCreateSupplier(supplier: Supplier) {
  const res = await fetch("/api/Suppliers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(supplier),
  });
  if (!res.ok) throw new Error("Failed to create supplier");
  return res.json();
}

export async function apiGetSupplier(id: number) {
  const res = await fetch(`/api/Suppliers/${id}`);
  if (!res.ok) throw new Error("Failed to fetch supplier");
  return res.json();
}

export async function apiUpdateSupplier(
  id: number,
  supplier: Partial<Supplier>,
) {
  const res = await fetch(`/api/Suppliers/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(supplier),
  });
  if (!res.ok) throw new Error("Failed to update supplier");
  return res.json();
}

export async function apiDeleteSupplier(id: number) {
  const res = await fetch(`/api/Suppliers/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete supplier");
  return res.json();
}
