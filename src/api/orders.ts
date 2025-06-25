import type { Order } from "../types";

export async function apiGetOrders() {
  const res = await fetch("/api/Orders");
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
}

export async function apiCreateOrder(order: Order) {
  const res = await fetch("/api/Orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  if (!res.ok) throw new Error("Failed to create order");
  return res.json();
}

export async function apiGetOrder(id: number) {
  const res = await fetch(`/api/Orders/${id}`);
  if (!res.ok) throw new Error("Failed to fetch order");
  return res.json();
}

export async function apiUpdateOrder(id: number, order: Partial<Order>) {
  const res = await fetch(`/api/Orders/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  if (!res.ok) throw new Error("Failed to update order");
  return res.json();
}

export async function apiDeleteOrder(id: number) {
  const res = await fetch(`/api/Orders/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete order");
  return res.json();
}
