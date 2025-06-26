import React, { useEffect, useState } from "react";
import { apiGetEventLogs } from "../api/eventLogs";
import type { EventLog } from "../types";

const EventLogsPage = () => {
  const [logs, setLogs] = useState<EventLog[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiGetEventLogs()
      .then(setLogs)
      .catch((e: unknown) => {
        if (e instanceof Error) setError(e.message);
        else setError("Unknown error");
      });
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2>Event Logs</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Order ID</th>
            <th>Timestamp</th>
            <th>Activity</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.orderId}</td>
              <td>{log.timestamp}</td>
              <td>{log.activity}</td>
              <td>{log.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventLogsPage;
