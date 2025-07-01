// src/api/planning.api.ts

import type { Planning } from "../types";

// Alle planningen ophalen
export async function apiGetAllPlanning(): Promise<Planning[]> {
  const response = await fetch("/api/Planning");
  if (!response.ok) throw new Error("Failed to fetch planning data");
  return response.json();
}

// Specifieke planning ophalen
export async function apiGetPlanning(id: number): Promise<Planning> {
  const response = await fetch(`/api/Planning/${id}`);
  if (!response.ok) throw new Error("Failed to fetch planning");
  return response.json();
}

// Nieuwe planning aanmaken
export async function apiCreatePlanning(
  planning: Partial<Planning>,
): Promise<Planning> {
  const response = await fetch("/api/Planning", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(planning),
  });
  if (!response.ok) throw new Error("Failed to create planning");
  return response.json();
}

// Planning updaten
export async function apiUpdatePlanning(planning: Planning): Promise<Planning> {
  const response = await fetch(`/api/Planning/${planning.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(planning),
  });
  if (!response.ok) throw new Error("Failed to update planning");
  return response.json();
}

// Planning verwijderen
export async function apiDeletePlanning(id: number): Promise<void> {
  const response = await fetch(`/api/Planning/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete planning");
}
