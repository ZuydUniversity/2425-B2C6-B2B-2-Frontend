import type { ApprovalForm } from "../types";

// GET all approval forms
export async function apiGetApprovalForms(): Promise<ApprovalForm[]> {
  const response = await fetch("/api/approvalforms");
  if (!response.ok) throw new Error("Failed to fetch approval forms");
  return response.json();
}

// POST a new approval form
export async function apiCreateApprovalForm(
  approvalForm: ApprovalForm,
): Promise<ApprovalForm> {
  const response = await fetch("/api/approvalforms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(approvalForm),
  });
  if (!response.ok) throw new Error("Failed to create approval form");
  return response.json();
}

// DELETE an approval form by ID
export async function apiDeleteApprovalForm(id: number): Promise<void> {
  const response = await fetch(`/api/approvalforms/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete approval form");
}
