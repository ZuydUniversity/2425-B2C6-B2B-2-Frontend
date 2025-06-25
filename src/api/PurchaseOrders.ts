import type { PurchaseOrder } from "../types";

export async function apiCreateOrders(orders: PurchaseOrder[]) {
  const response = await fetch("/api/purchaseorders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orders),
  });
  if (!response.ok) throw new Error("Failed to create purchase orders");
  return response.json();
}

export async function apiUpdateOrderStatus(
  order: PurchaseOrder,
  status: string,
  comment: string,
) {
  const response = await fetch(
    `/api/purchaseorders/${order.orderNumber}/status`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, comment }),
    },
  );
  if (!response.ok) throw new Error("Failed to update order status");
  return response.json();
}
