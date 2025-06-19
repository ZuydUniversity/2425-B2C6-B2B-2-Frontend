import React from "react";

// Simple button component for table cells
const TableButton: React.FC<{ label: string }> = ({ label }) => (
  <button
    style={{
      width: "100%",
      height: "100%",
      background: "#f8f8f8",
      border: "1px solid #bbb",
      borderRadius: 3,
      padding: "4px 0",
      cursor: "pointer",
      fontSize: "1rem",
    }}
    onClick={() => alert(`Clicked: ${label}`)}
  >
    {label}
  </button>
);

const InventoryPage = () => {
  // Example data for demonstration
  const rows = [
    {
      productId: "1001",
      leverancier: "Supplier A",
      producttype: "Type X",
      aantal: "50",
      kwaliteit: "8.5",
      frequentie: "Wekelijks",
      comment: "OK",
    },
    // Add more rows as needed
    ...Array(9).fill({
      productId: "",
      leverancier: "",
      producttype: "",
      aantal: "",
      kwaliteit: "",
      frequentie: "",
      comment: "",
    }),
  ];

  return (
    <div style={{ background: "#222", minHeight: "100vh" }}>
      {/* Header */}
      <div
        style={{
          background: "#222",
          color: "#ccc",
          padding: "0.5rem 1rem",
          fontWeight: "bold",
          fontSize: "1.2rem",
        }}
      >
        Overzicht\Voorraadbeheer
      </div>

      {/* Page Title */}
      <div style={{ background: "#fff", padding: "1rem 1.5rem 0.5rem 1.5rem" }}>
        <div style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
          Voorraadbeheer
        </div>
        <div style={{ borderBottom: "1px solid #888", marginTop: 4 }} />
      </div>

      {/* Table */}
      <div
        style={{
          background: "#fff",
          margin: "1.5rem",
          border: "1px solid #bbb",
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "#ddd" }}>
            <tr>
              <th style={{ border: "1px solid #aaa", padding: "8px" }}>
                ProductID
              </th>
              <th style={{ border: "1px solid #aaa", padding: "8px" }}>
                Leverancier
              </th>
              <th style={{ border: "1px solid #aaa", padding: "8px" }}>
                Producttype
              </th>
              <th style={{ border: "1px solid #aaa", padding: "8px" }}>
                Aantal
              </th>
              <th style={{ border: "1px solid #aaa", padding: "8px" }}>
                Kwaliteitcheck score
              </th>
              <th style={{ border: "1px solid #aaa", padding: "8px" }}>
                Frequentie levering
              </th>
              <th style={{ border: "1px solid #aaa", padding: "8px" }}>
                Comment
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={idx}
                style={{ background: idx % 2 === 0 ? "#f5f5f5" : "#fff" }}
              >
                <td style={{ border: "1px solid #ccc", height: 32 }}>
                  <TableButton label={row.productId || "ProductID"} />
                </td>
                <td style={{ border: "1px solid #ccc" }}>
                  <TableButton label={row.leverancier || "Leverancier"} />
                </td>
                <td style={{ border: "1px solid #ccc" }}>
                  {/* Producttype stays as plain text */}
                  {row.producttype || "Producttype"}
                </td>
                <td style={{ border: "1px solid #ccc" }}>
                  <TableButton label={row.aantal || "Aantal"} />
                </td>
                <td style={{ border: "1px solid #ccc" }}>
                  <TableButton label={row.kwaliteit || "Kwaliteit"} />
                </td>
                <td style={{ border: "1px solid #ccc" }}>
                  <TableButton label={row.frequentie || "Frequentie"} />
                </td>
                <td style={{ border: "1px solid #ccc" }}>
                  <TableButton label={row.comment || "Comment"} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryPage;
