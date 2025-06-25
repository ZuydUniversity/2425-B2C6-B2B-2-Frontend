import type { PurchaseOrder } from "../pages/purchasing";

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

// Use _ to avoid unused-vars lint error, but allow arguments
export async function apiCreateOrders(orders: PurchaseOrder[]) {
  void orders;
  return Promise.resolve();
}

export async function apiUpdateOrderStatus(
  order: PurchaseOrder,
  status: string,
  comment: string,
) {
  void order;
  void status;
  void comment;
  return Promise.resolve();
}
