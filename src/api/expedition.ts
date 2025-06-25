import type { Expedition } from "../types";

export async function apiCreateExpedition(expedition: Expedition) {
  const response = await fetch("/api/expeditions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expedition),
  });
  if (!response.ok) throw new Error("Failed to create expedition");
  return response.json();
}
