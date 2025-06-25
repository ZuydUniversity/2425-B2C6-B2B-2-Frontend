import type { RejectionForm } from "../types";

// GET all rejection forms
export async function apiGetRejectionForms(): Promise<RejectionForm[]> {
  const response = await fetch("/api/rejectionforms");
  if (!response.ok) throw new Error("Failed to fetch rejection forms");
  return response.json();
}

// POST a new rejection form
export async function apiCreateRejectionForm(
  rejectionForm: RejectionForm,
): Promise<RejectionForm> {
  const response = await fetch("/api/rejectionforms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(rejectionForm),
  });
  if (!response.ok) throw new Error("Failed to create rejection form");
  return response.json();
}

// DELETE a rejection form by ID
export async function apiDeleteRejectionForm(id: number): Promise<void> {
  const response = await fetch(`/api/rejectionforms/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete rejection form");
}
