const InventoryPage = () => {
  return (
    <>
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
            {[...Array(10)].map((_, idx) => (
              <tr
                key={idx}
                style={{ background: idx % 2 === 0 ? "#f5f5f5" : "#fff" }}
              >
                <td style={{ border: "1px solid #ccc", height: 32 }} />
                <td style={{ border: "1px solid #ccc" }} />
                <td style={{ border: "1px solid #ccc" }} />
                <td style={{ border: "1px solid #ccc" }} />
                <td style={{ border: "1px solid #ccc" }} />
                <td style={{ border: "1px solid #ccc" }} />
                <td style={{ border: "1px solid #ccc" }} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default InventoryPage;
