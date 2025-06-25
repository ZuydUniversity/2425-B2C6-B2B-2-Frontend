import type { Picklist } from "../types";

export async function apiCreatePicklist(picklist: Picklist) {
  const response = await fetch("/api/picklists", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(picklist),
  });
  if (!response.ok) throw new Error("Failed to create picklist");
  return response.json();
}
