import React from "react";
import styles from "./inventory-management.module.scss";

const TableButton: React.FC<{ label: string }> = ({ label }) => (
  <button
    className={styles.tableButton}
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
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>Overzicht Voorraadbeheer</div>

      {/* Page Title */}
      <div className={styles.pageTitle}>
        <div className={styles.titleText}>Voorraadbeheer</div>
        <div className={styles.separator} />
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.th}>ProductID</th>
              <th className={styles.th}>Leverancier</th>
              <th className={styles.th}>Producttype</th>
              <th className={styles.th}>Aantal</th>
              <th className={styles.th}>Kwaliteitcheck score</th>
              <th className={styles.th}>Frequentie levering</th>
              <th className={styles.th}>Comment</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={idx}
                style={{ background: idx % 2 === 0 ? "#f5f5f5" : "#fff" }}
              >
                <td className={styles.buttonCell}>
                  <TableButton label={row.productId || "ProductID"} />
                </td>
                <td className={styles.buttonCell}>
                  <TableButton label={row.leverancier || "Leverancier"} />
                </td>
                <td className={styles.buttonCell}>
                  {row.producttype || "Producttype"}
                </td>
                <td className={styles.buttonCell}>
                  <TableButton label={row.aantal || "Aantal"} />
                </td>
                <td className={styles.buttonCell}>
                  <TableButton label={row.kwaliteit || "Kwaliteit"} />
                </td>
                <td className={styles.buttonCell}>
                  <TableButton label={row.frequentie || "Frequentie"} />
                </td>
                <td className={styles.buttonCell}>
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
