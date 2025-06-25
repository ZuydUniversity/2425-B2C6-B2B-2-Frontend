import type { RejectionForm } from "../types";

export async function apiCreateRejectionForm(rejectionForm: RejectionForm) {
  const response = await fetch("/api/rejectionforms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(rejectionForm),
  });
  if (!response.ok) throw new Error("Failed to create rejection form");
  return response.json();
}
