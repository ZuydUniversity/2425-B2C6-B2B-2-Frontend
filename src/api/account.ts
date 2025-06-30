import type { Customer, Order } from "../types";

// Alle klanten ophalen (bijv. voor notificatie bij afkeuring)
export async function apiGetAllCustomers(): Promise<Customer[]> {
  const response = await fetch("/api/Customers");
  if (!response.ok) throw new Error("Failed to fetch customers");
  return response.json();
}

// Specifieke klant ophalen
export async function apiGetCustomer(id: number): Promise<Customer> {
  const response = await fetch(`/api/Customers/${id}`);
  if (!response.ok) throw new Error("Failed to fetch customer");
  return response.json();
}

// Alle orders ophalen (voor tabel)
export async function apiGetAllOrders(): Promise<Order[]> {
  const response = await fetch("/api/Orders");
  if (!response.ok) throw new Error("Failed to fetch orders");
  return response.json();
}

// Eén specifieke order (voor details modal)
export async function apiGetOrder(id: number): Promise<Order> {
  const response = await fetch(`/api/Orders/${id}`);
  if (!response.ok) throw new Error("Failed to fetch order");
  return response.json();
}

// Order goed- of afkeuren met comment (rejectionReason)
export async function apiUpdateOrderStatus(
  orderId: number,
  status: string,
  comment: string,
): Promise<Order> {
  const response = await fetch(`/api/Orders/${orderId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status, comment }),
  });
  if (!response.ok) throw new Error("Failed to update order status");
  return response.json();
}

// order goedgekeurd door account manager
export async function apiCreateApprovalForm(orderId: number) {
  const approvalForm = {
    orderId,
    purchaseOrderId: "",
    isApproved: true,
    comments: "Goedkeuring door accountmanager",
    dateApproved: new Date().toISOString(),
  };
  const res = await fetch("/api/approvalforms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(approvalForm),
  });
  if (!res.ok) throw new Error("ApprovalForm failed");
  return res.json();
}

export async function apiCreateEventLog(event: {
  orderId: number;
  message: string;
  role: "Klant" | "Planning" | "Accountmanager";
}) {
  const res = await fetch("/api/eventlogs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      orderId: event.orderId,
      message: event.message,
      role: event.role,
      timestamp: new Date().toISOString(),
    }),
  });
  if (!res.ok) throw new Error("Failed to log event");
  return res.json();
}
