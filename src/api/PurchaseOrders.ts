import type { PurchaseOrder } from "../types";

// CREATE multiple purchase orders
export async function apiCreateOrders(orders: PurchaseOrder[]) {
  const response = await fetch("/api/purchaseorders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orders),
  });
  if (!response.ok) throw new Error("Failed to create purchase orders");
  return response.json();
}

// UPDATE order status
export async function apiUpdateOrderStatus(
  orderNumber: string,
  status: string,
  comment: string,
) {
  const response = await fetch(`/api/purchaseorders/${orderNumber}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status, comment }),
  });
  if (!response.ok) throw new Error("Failed to update order status");
  return response.json();
}
