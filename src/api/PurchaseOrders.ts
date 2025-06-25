import type { PurchaseOrder } from "../pages/purchasing";

// Convert PurchaseOrder to API payload (IDs instead of objects)
export function toApiPayload(order: PurchaseOrder) {
  return {
    orderNumber: order.orderNumber,
    orderDate: order.orderDate,
    status: order.status,
    productId: order.product?.id ?? null,
    supplierId: order.supplier?.id ?? null,
    quantity: order.quantity,
    comment: order.comment,
  };
}

// Placeholder: Create new purchase orders
export async function apiCreateOrders(orders: PurchaseOrder[]) {
  // Replace with real API call
  // Example:
  // await fetch('/api/purchaseorders', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(orders.map(toApiPayload)),
  // });
  return Promise.resolve();
}

// Placeholder: Update order status
export async function apiUpdateOrderStatus(
  order: PurchaseOrder,
  status: string,
  comment: string,
) {
  // Replace with real API call
  // Example:
  // await fetch(`/api/purchaseorders/${order.orderNumber}/status`, {
  //   method: 'PATCH',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ status, comment }),
  // });
  return Promise.resolve();
}
