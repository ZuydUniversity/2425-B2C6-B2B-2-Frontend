import type { ApprovalForm } from "../types";

export async function apiCreateApprovalForm(approvalForm: ApprovalForm) {
  const response = await fetch("/api/approvalforms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(approvalForm),
  });
  if (!response.ok) throw new Error("Failed to create approval form");
  return response.json();
}
