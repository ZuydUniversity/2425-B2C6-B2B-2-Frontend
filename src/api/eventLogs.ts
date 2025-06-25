import type { EventLog } from "../types";

export async function apiCreateEventLog(eventlog: EventLog) {
  const response = await fetch("/api/eventlogs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventlog),
  });
  if (!response.ok) throw new Error("Failed to create event log");
  return response.json();
}

export async function apiGetEventLogs(): Promise<EventLog[]> {
  const response = await fetch("/api/eventlogs");
  if (!response.ok) throw new Error("Failed to fetch event logs");
  return response.json();
}
