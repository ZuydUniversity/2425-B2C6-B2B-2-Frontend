import type { PurchaseOrder } from "../types";

// CREATE multiple purchase orders
export async function apiCreateOrders(orders: PurchaseOrder[]) {
  const response = await fetch("/api/purchaseOrders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orders),
  });
  if (!response.ok) throw new Error("Failed to create purchase orders");
  return response.json();
}

// GET all purchase orders
export async function apiGetOrders(): Promise<PurchaseOrder[]> {
  const response = await fetch("/api/purchaseOrders");
  if (!response.ok) throw new Error("Failed to fetch purchase orders");
  return response.json();
}

// UPDATE purchase order by id
export async function apiUpdatePurchaseOrder(
  id: number,
  data: Partial<PurchaseOrder>,
) {
  const response = await fetch(`/api/purchaseOrders/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update purchase order");
  return response.json();
}
