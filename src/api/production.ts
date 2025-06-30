import type { ProductionLine, Product } from "../types";

// Alle productielijnen
export async function apiGetProductLines(): Promise<ProductionLine[]> {
  const response = await fetch("/api/ProductLine");
  if (!response.ok) throw new Error("Failed to fetch product lines");
  return response.json();
}

// Alle producten
export async function apiGetProducts(): Promise<Product[]> {
  const response = await fetch("/api/Products");
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
}

// status van de order bijwerken
export async function apiUpdateOrderStatus(orderId: number, status: string) {
  const response = await fetch(`/api/Orders/${orderId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error("Failed to update status");
  return response.json();
}
