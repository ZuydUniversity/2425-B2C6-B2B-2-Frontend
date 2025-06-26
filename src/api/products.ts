import type { Product } from "../types";

export async function apiGetProducts() {
  const res = await fetch("/api/Products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function apiCreateProduct(product: Product) {
  const res = await fetch("/api/Products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Failed to create product");
  return res.json();
}

export async function apiGetProduct(id: number) {
  const res = await fetch(`/api/Products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export async function apiUpdateProduct(id: number, product: Partial<Product>) {
  const res = await fetch(`/api/Products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Failed to update product");
  return res.json();
}

export async function apiDeleteProduct(id: number) {
  const res = await fetch(`/api/Products/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete product");
  return res.json();
}
