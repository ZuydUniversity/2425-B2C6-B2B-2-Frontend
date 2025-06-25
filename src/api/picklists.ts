import type { Picklist } from "../types";

// GET all picklists
export async function apiGetPicklists(): Promise<Picklist[]> {
  const response = await fetch("/api/picklists");
  if (!response.ok) throw new Error("Failed to fetch picklists");
  return response.json();
}

// GET a single picklist by ID
export async function apiGetPicklist(id: number): Promise<Picklist> {
  const response = await fetch(`/api/picklists/${id}`);
  if (!response.ok) throw new Error("Failed to fetch picklist");
  return response.json();
}

// CREATE a new picklist
export async function apiCreatePicklist(picklist: Picklist): Promise<Picklist> {
  const response = await fetch("/api/picklists", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(picklist),
  });
  if (!response.ok) throw new Error("Failed to create picklist");
  return response.json();
}

// UPDATE an existing picklist
export async function apiUpdatePicklist(
  id: number,
  picklist: Partial<Picklist>,
): Promise<Picklist> {
  const response = await fetch(`/api/picklists/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(picklist),
  });
  if (!response.ok) throw new Error("Failed to update picklist");
  return response.json();
}

// DELETE a picklist by ID
export async function apiDeletePicklist(id: number): Promise<void> {
  const response = await fetch(`/api/picklists/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete picklist");
  return response.json();
}
