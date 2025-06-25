import type { PartsDelivery } from "../types";

export async function apiCreatePartsDelivery(partsDelivery: PartsDelivery) {
  const response = await fetch("/api/partsdeliveries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(partsDelivery),
  });
  if (!response.ok) throw new Error("Failed to create parts delivery");
  return response.json();
}
