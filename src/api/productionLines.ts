import type { ProductionLine } from "../types";

export async function apiGetProductionLines() {
  const res = await fetch("/api/ProductionLine");
  if (!res.ok) throw new Error("Failed to fetch production lines");
  return res.json();
}

export async function apiCreateProductionLine(line: ProductionLine) {
  const res = await fetch("/api/ProductionLine", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(line),
  });
  if (!res.ok) throw new Error("Failed to create production line");
  return res.json();
}

export async function apiUpdateProductionLine(
  id: number,
  line: Partial<ProductionLine>,
) {
  const res = await fetch(`/api/ProductionLine/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(line),
  });
  if (!res.ok) throw new Error("Failed to update production line");
  return res.json();
}

export async function apiDeleteProductionLine(id: number) {
  const res = await fetch(`/api/ProductionLine/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete production line");
  return res.json();
}
